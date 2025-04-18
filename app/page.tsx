"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Info } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleClick = () => {
    redirect("/about");
  };

  const animationClasses = `
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
    .animate-slideUp {
      animation: slideUp 0.8s ease-out forwards;
    }
    .animate-fadeInScale {
      animation: fadeInScale 0.8s ease-out forwards;
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes slideUp {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInScale {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
  `;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDark
          ? "from-gray-900 to-gray-800 text-gray-100"
          : "from-blue-50 to-indigo-50 text-gray-800"
      } relative`}
    >

      <div
        className={`absolute inset-0 w-full h-full bg-no-repeat z-0 transition-opacity duration-1000 ease-in-out ${
          isLoaded ? "opacity-30" : "opacity-0"
        }`}
        style={{
          backgroundImage: "url('/image2.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          animation: "slowPulse 15s infinite alternate",
          filter: isDark ? "hue-rotate(45deg) saturate(1.5)" : "none",
        }}
      ></div>
      <style jsx>{`
        @keyframes slowPulse {
          0% {
            opacity: 0.15;
            transform: scale(1);
          }
          100% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }
        ${animationClasses}
      `}</style>

      {/* Page content */}
      <div className="container mx-auto px-6 py-10 relative z-10">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <img src="/medical.png" alt="Medihelp Logo" className="h-8 w-8" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleClick}
              size="sm"
              className={`rounded-full ${
                isDark
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700 text-indigo-300"
                  : "border-blue-200 bg-white hover:bg-blue-50 text-indigo-600"
              }`}
            >
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${
                isDark
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                  : "border-blue-200 bg-white hover:bg-blue-50"
              }`}
              onClick={toggleDark}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600" />
              )}
            </Button>
          </div>
        </header>

        <main className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1
            className={`text-6xl font-extrabold tracking-tight mb-6 ${
              isDark
                ? "text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text"
                : "text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text"
            } ${isLoaded ? "animate-fadeIn" : "opacity-0"}`}
          >
            MediHelp
          </h1>

          <p
            className={`text-xl mb-12 ${
              isDark
                ? "text-transparent bg-gradient-to-r from-green-300 via-teal-300 to-purple-400 bg-clip-text"
                : "text-indigo-700"
            } ${isLoaded ? "animate-slideUp" : "opacity-0 translate-y-4"}`}
            style={{
              animationDelay: "0.2s",
              animationFillMode: "forwards",
            }}
          >
            Your AI-powered medical assistant for simplified health reports and
            personalized mental wellness
          </p>

          <div
            className={`text-center mb-12 ${
              isDark ? "text-fuchsia-200" : "text-gray-700"
            }`}
          >
            <p className="text-lg mb-4">
              MediHelp leverages advanced AI to analyze your medical reports and
              provide easy-to-understand insights. Upload your medical documents
              or share your concerns through voice recordings, and receive
              personalized guidance and explanations.
            </p>
            <p className="text-lg">
              Our specialized mental health guidance helps you understand
              potential concerns and offers recommendations tailored to your
              medical history. MediHelp makes healthcare information accessible
              and actionable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md ${
                isLoaded ? "animate-fadeInScale" : "opacity-0 scale-95"
              }`}
              style={{
                animationDelay: "0.3s",
                animationFillMode: "forwards",
              }}
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-indigo-900/50" : "bg-indigo-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isDark ? "text-amber-300" : "text-indigo-600"}
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDark ? "text-red-300" : "text-indigo-700"
                }`}
              >
                Report Analysis
              </h3>
              <p className={`${isDark ? "text-teal-300" : "text-gray-600"}`}>
                Upload medical documents for instant analysis and simplified
                explanations.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md ${
                isLoaded ? "animate-fadeInScale" : "opacity-0 scale-95"
              }`}
              style={{
                animationDelay: "0.5s",
                animationFillMode: "forwards",
              }}
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-indigo-900/50" : "bg-indigo-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isDark ? "text-pink-300" : "text-indigo-600"}
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDark ? "text-pink-300" : "text-indigo-700"
                }`}
              >
                Mental Health Guidance
              </h3>
              <p className={`${isDark ? "text-violet-300" : "text-gray-600"}`}>
                Receive personalized mental health insights based on your
                medical history.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md ${
                isLoaded ? "animate-fadeInScale" : "opacity-0 scale-95"
              }`}
              style={{
                animationDelay: "0.7s",
                animationFillMode: "forwards",
              }}
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isDark ? "bg-indigo-900/50" : "bg-indigo-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isDark ? "text-sky-300" : "text-indigo-600"}
                >
                  <path d="M12 19c0-4.2-2.8-7-7-7M5 12V5m14 7c0-4.2-2.8-7-7-7m7 7v7"></path>
                </svg>
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDark ? "text-sky-300" : "text-indigo-700"
                }`}
              >
                Voice Processing
              </h3>
              <p className={`${isDark ? "text-emerald-300" : "text-gray-600"}`}>
                Record your symptoms or concerns for hands-free health
                assistance.
              </p>
            </div>
          </div>

          <Link href="/report">
            <Button
              size="lg"
              className={`rounded-full px-8 py-6 text-lg ${
                isDark
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                isLoaded ? "animate-bounce" : "opacity-0"
              }`}
              style={{
                animationDelay: "1s",
                animationDuration: "1s",
                animationIterationCount: "1",
                animationFillMode: "forwards",
              }}
            >
              Get Started Now
            </Button>
          </Link>
        </main>
      </div>

      <footer
        className={`mt-24 py-6 ${
          isDark ? "bg-gray-900" : "bg-indigo-100/50"
        } relative z-10`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className={`${
                isDark ? "text-gray-500" : "text-gray-600"
              } text-sm`}
            >
              © {new Date().getFullYear()} MediHelp. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="/about"
                className={`${
                  isDark
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-600 hover:text-indigo-700"
                } text-sm`}
              >
                Privacy Policy
              </a>
              <a
                href="/about"
                className={`${
                  isDark
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-600 hover:text-indigo-700"
                } text-sm`}
              >
                Terms of Service
              </a>
              <a
                href="/about"
                className={`${
                  isDark
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-600 hover:text-indigo-700"
                } text-sm`}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
