import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";
const google_api_key = process.env.GOOGLE_API_KEY as string;
const genAI = new GoogleGenerativeAI(google_api_key);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `
Analyze the provided speech transcript or text data for potential indicators of depression and anxiety.

Please thoroughly evaluate the content and identify:
- Emotional patterns and mood indicators
- Linguistic markers that may suggest depression or anxiety
- Themes of negative self-talk, hopelessness, or excessive worry
- Changes in thought patterns or energy levels
- Sleep disturbances or appetite changes mentioned
- Social withdrawal or isolation indicators
- Stress factors or life events that may be contributing

Create a comprehensive mental health analysis summary that:
1. Highlights key observations from the text/speech data
2. Identifies potential depression and anxiety indicators
3. Notes the severity level of observed symptoms (mild, moderate, severe)
4. Provides helpful, empathetic insights based on the content
5. Suggests appropriate self-care strategies when applicable

NOTE: This is a preliminary analysis tool and does not replace professional diagnosis. 
Always encourage seeking help from qualified mental health professionals.

## Mental Health Analysis Summary:
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { base64 } = req.body;
  const filePart = fileToGenerativePart(base64);

  const result = await model.generateContent([prompt, filePart]);
  const textResponse =
    result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log(textResponse);

  return res.status(200).json(textResponse);
}

function fileToGenerativePart(imageData: string) {
  return {
    inlineData: {
      data: imageData.split(",")[1],
      mimeType: imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.lastIndexOf(";")
      ),
    },
  };
}
