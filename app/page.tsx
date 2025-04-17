/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ReportComponent from "@/components/ResumeComponent";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ChatComponent from "@/components/ChatComponent";

export default function ResumeAnalyzer() {
  const [isDark, setIsDark] = useState(false);
  const [resumeAdded, setResumeAdded] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const [reportData, setreportData] = useState("");
  const onReportConfirmation = (data: string) => {
    setreportData(data);
    console.log(reportData);
    toast({
      title: "Updated",
    });
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 bg-background ${
        isDark ? "dark" : ""
      }`}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/medical.png" 
              alt="Medihelp Logo"
              className="h-8 w-8"
            />
            <h1
              className={`text-3xl font-extrabold tracking-tight ${
                isDark
                  ? "text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text"
                  : "text-gray-900"
              }`}
            >
              MediHelp
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 overflow-y-scroll ">
          <Card>
            <CardHeader>
              <CardTitle>
                Upload your medical report in PDF or JPG format{" "}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ReportComponent onReportConfirmation={onReportConfirmation} />
            </CardContent>
          </Card>

          <ChatComponent reportData={reportData} />
        </div>
      </div>
    </div>
  );
}
