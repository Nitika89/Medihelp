export const runtime = "edge";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { StreamData, streamText } from "ai";
import { queryPineconeDatabase } from "@/lib/pinecone";

const google_api_key = process.env.GOOGLE_API_KEY as string;

export const maxDuration = 60;

const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey: google_api_key,
});

const model = google("gemini-2.0-flash-exp", {
  safetySettings: [
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_LOW_AND_ABOVE" },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_LOW_AND_ABOVE" },
    {
      category: "HARM_CATEGORY_CIVIC_INTEGRITY",
      threshold: "BLOCK_LOW_AND_ABOVE",
    },
  ],
});

export default async function handler(req: Request) {
  const { messages, data } = await req.json();
  console.log(data.reportData);

  const userQuestion = `${messages[messages.length - 1].content}`;

  const query = `Represent this for searching relevant mental health insights: speech/text analysis says: \n${data.reportData}. \n\n${userQuestion}`;

  const retrievals = await queryPineconeDatabase(
    "medicalrag",
    "example2",
    query
  );

  const finalPrompt = `You are a supportive, empathetic mental health assistant. I have a speech or text sample analysis and a user query related to mental health. Some relevant mental health insights are also provided that may be applicable to this case.

**Speech/Text Analysis:**
${data.reportData}
**End of analysis**

**User Query:**
${userQuestion}
**End of user query**

**Relevant Mental Health Context:**
${retrievals}
**End of mental health context**

Please analyze the speech/text data considering:
1. Indicators of depression, anxiety, or other mental health concerns
2. The severity level of any symptoms detected (mild, moderate, severe)
3. Changes in linguistic patterns, emotional expression, or thought processes
4. Potential stressors or triggers mentioned
5. The specific questions or concerns raised by the user

Provide a thoughtful, compassionate response that:
- Addresses the user's specific query
- Explains relevant indicators found in the speech/text analysis
- Offers perspective on the mental health context
- Suggests potential coping strategies or resources when appropriate
- Uses warm, supportive language while remaining professional
- Does NOT attempt to diagnose or replace professional mental health advice

Important: Always emphasize that this analysis is not a clinical diagnosis and encourage seeking professional mental health support when appropriate.

**Response:**
`;
  const rawdata = new StreamData();
  rawdata.append({
    retrievals: retrievals,
  });

  const result = await streamText({
    model: model,
    prompt: finalPrompt,
    onFinish() {
      rawdata.close();
    },
  });

  for await (const textPart of result.textStream) {
    console.log(textPart);
  }

  return result.toDataStreamResponse({ data: rawdata });
}
