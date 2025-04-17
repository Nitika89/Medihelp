import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangeEvent, FC, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SocialMediaLinks from "./social-links";

type Props = {
  onReportConfirmation: (data: string) => void;
};

const ReportComponent: FC<Props> = ({ onReportConfirmation }: Props) => {
  const { toast } = useToast();
  const [base64Data, setBase64Data] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "speech">("text");

  async function extractDetails() {
    if (!base64Data) {
      toast({
        variant: "destructive",
        description: `Upload a valid ${
          activeTab === "text" ? "report" : "speech file"
        }!`,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/listgeminireport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64: base64Data,
        }),
      });

      if (response.ok) {
        const reportText = await response.text();

        const formattedText = reportText
          .replace(/\\n/g, "\n")
          .replace(/\*\*/g, "")
          .replace(/^##\s*/gm, "")
          .trim();

        setReportData(formattedText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReportSelection(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (file) {
      let isValidImage = false;
      let isValidDoc = false;
      const validImages = ["image/jpeg", "image/png", "image/webp"];
      const validDocs = ["application/pdf"];
      if (validImages.includes(file.type)) {
        isValidImage = true;
      }
      if (validDocs.includes(file.type)) {
        isValidDoc = true;
      }
      if (!(isValidImage || isValidDoc)) {
        toast({
          variant: "destructive",
          description: "Filetype not supported!",
        });
        return;
      }

      if (isValidImage) {
        compressImage(file, (compressedFile) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64String = reader.result as string;
            setBase64Data(base64String);
          };

          reader.readAsDataURL(compressedFile);
        });
      }

      if (isValidDoc) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setBase64Data(base64String);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  function handleSpeechSelection(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (file) {
      const validAudioTypes = [
        "audio/mp3",
        "audio/mpeg",
        "audio/wav",
        "audio/ogg",
        "audio/webm",
      ];

      if (!validAudioTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          description:
            "Audio filetype not supported! Please use MP3, WAV, or OGG format.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Data(base64String);
      };

      reader.readAsDataURL(file);
    }
  }

  function compressImage(file: File, callback: (compressedFile: File) => void) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx!.drawImage(img, 0, 0);
        const quality = 0.1;
        const dataURL = canvas.toDataURL("image/jpeg", quality);

        const byteString = atob(dataURL.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const compressedFile = new File([ab], file.name, {
          type: "image/jpeg",
        });

        callback(compressedFile);
      };
      img.src = e.target!.result as string;
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="grid w-full items-start gap-6 overflow-auto p-2 pt-0">
      <fieldset className="relative grid gap-6 rounded-lg border p-4">
        {isLoading && (
          <div
            className={
              "absolute z-10 h-full w-full bg-card/90 rounded-lg flex flex-row items-center justify-center"
            }
          >
            extracting...
          </div>
        )}

        {/* Custom Tab UI */}
        <div className="grid grid-cols-2 gap-2 w-full border rounded-md overflow-hidden">
          <button
            onClick={() => setActiveTab("text")}
            className={`py-2 text-center transition-colors ${
              activeTab === "text"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Text/Document
          </button>
          <button
            onClick={() => setActiveTab("speech")}
            className={`py-2 text-center transition-colors ${
              activeTab === "speech"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Speech/Audio
          </button>
        </div>

        <div className="py-2">
          {activeTab === "text" ? (
            <>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={handleReportSelection}
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPEG, PNG, WEBP, PDF
              </p>
            </>
          ) : (
            <>
              <Input
                type="file"
                accept="audio/mp3,audio/mpeg,audio/wav,audio/ogg,audio/webm"
                onChange={handleSpeechSelection}
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: MP3, WAV, OGG, WEBM
              </p>
            </>
          )}
        </div>

        <Button onClick={extractDetails}>
          1. Upload {activeTab === "text" ? "Document" : "Speech"}
        </Button>

        <Textarea
          value={reportData}
          onChange={(e) => {
            setReportData(e.target.value);
          }}
          placeholder={
            activeTab === "text"
              ? "Extracted data from the report will appear here. Get better recommendations by providing additional details..."
              : "Transcribed and analyzed speech data will appear here. You can edit or add additional context..."
          }
          className="min-h-72 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />

        <Button
          variant="destructive"
          className="bg-[#9f242e]"
          onClick={() => {
            onReportConfirmation(reportData);
          }}
        >
          2. Finalize {activeTab === "text" ? "Report" : "Speech Analysis"}
        </Button>

        <div className="flex flex-row items-center justify-center gap-2 p-4">
          <Label>Share your thoughts </Label>
          <SocialMediaLinks />
        </div>
      </fieldset>
    </div>
  );
};

export default ReportComponent;
