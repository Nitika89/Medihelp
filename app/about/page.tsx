"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDark
          ? "from-gray-900 to-gray-800 text-gray-100"
          : "from-blue-50 to-indigo-50 text-gray-800"
      } transition-colors duration-500`}
    >
      <div className="container mx-auto px-6 py-10">
        <header
          className={`flex justify-between items-center mb-16 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          } transition-all duration-700 ease-out`}
        >
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className={`rounded-full ${
                  isDark
                    ? "border-gray-700 bg-gray-800 hover:bg-gray-700 text-indigo-300"
                    : "border-blue-200 bg-white hover:bg-blue-50 text-indigo-600"
                } hover:scale-105 transition-all duration-300`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src="/medical.png" alt="Medihelp Logo" className="h-8 w-8" />
            </div>

            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${
                isDark
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                  : "border-blue-200 bg-white hover:bg-blue-50"
              } hover:rotate-12 transition-all duration-300`}
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

        <main className="max-w-4xl mx-auto">
          <div
            className={`mb-12 text-center ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-1000 ease-out`}
          >
            <h1
              className={`text-5xl font-extrabold tracking-tight mb-6 ${
                isDark
                  ? "text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text"
                  : "text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text"
              }`}
            >
              About MediHelp
            </h1>
            <div
              className={`w-24 h-1 mx-auto rounded-full ${
                isDark ? "bg-indigo-500" : "bg-indigo-600"
              }`}
            ></div>
          </div>
          <div
            className={`space-y-12 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } transition-all duration-1000 delay-300 ease-out`}
          >
            <section
              className={`p-8 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                Our Mission
              </h2>
              <p
                className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}
              >
                At MediHelp, our mission is to bridge the gap between complex
                medical information and everyday understanding. We believe that
                everyone deserves access to clear, comprehensible explanations
                of their health data, regardless of their medical background or
                expertise.
              </p>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Founded in 2023, MediHelp was born from the recognition that
                many patients struggle to understand their medical reports and
                the implications for their health. Our AI-powered platform
                transforms technical medical jargon into accessible insights,
                empowering patients to take control of their health journey with
                confidence and clarity.
              </p>
            </section>
            <section
              className={`p-8 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                Our Team
              </h2>
              <p
                className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}
              >
                MediHelp brings together a diverse team of healthcare
                professionals, AI specialists, and user experience designers
                united by a shared vision: making healthcare information more
                accessible to all.
              </p>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Our multidisciplinary team includes board-certified physicians,
                data scientists specialized in healthcare AI, mental health
                professionals, and designers with expertise in creating
                intuitive healthcare interfaces. This collaborative approach
                ensures that MediHelp delivers accurate, helpful, and
                user-friendly insights that address the whole spectrum of
                users&apos; health concerns.
              </p>
            </section>
            <section
              className={`p-8 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                Our Technology
              </h2>
              <p
                className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}
              >
                MediHelp leverages cutting-edge artificial intelligence and
                natural language processing to analyze medical reports, speech
                inputs, and user queries. Our proprietary algorithms have been
                trained on diverse medical datasets to ensure accuracy across
                different specialties, demographic groups, and health
                conditions.
              </p>
              <p
                className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}
              >
                We employ a hybrid approach that combines rule-based systems and
                machine learning models to ensure both precision and
                adaptability. Our mental health module was developed in
                collaboration with clinical psychologists and psychiatrists to
                provide sensitive, appropriate guidance for users seeking mental
                health support.
              </p>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                All data processing occurs with strict attention to privacy and
                security, adhering to HIPAA guidelines and employing end-to-end
                encryption to protect users&apos; sensitive health information.
              </p>
            </section>
            <section
              className={`p-8 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDark ? "text-cyan-300" : "text-indigo-600"
                    }`}
                  >
                    Accessibility
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    We believe healthcare information should be understandable
                    to everyone, regardless of their background or level of
                    medical knowledge.
                  </p>
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDark ? "text-cyan-300" : "text-indigo-600"
                    }`}
                  >
                    Accuracy
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Our commitment to medical precision is unwavering, with all
                    insights reviewed and validated by healthcare professionals.
                  </p>
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDark ? "text-cyan-300" : "text-indigo-600"
                    }`}
                  >
                    Empathy
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    We approach every user interaction with compassion,
                    understanding that health concerns can be accompanied by
                    anxiety and uncertainty.
                  </p>
                </div>
                <div>
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDark ? "text-cyan-300" : "text-indigo-600"
                    }`}
                  >
                    Privacy
                  </h3>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    We maintain the highest standards of data protection and
                    confidentiality, treating users&apos; health information
                    with the utmost respect.
                  </p>
                </div>
              </div>
            </section>
            <section
              className={`p-8 rounded-xl ${
                isDark ? "bg-gray-800/70" : "bg-white"
              } shadow-md text-center`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                Get in Touch
              </h2>
              <p
                className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-6`}
              >
                Have questions about MediHelp? We&apos;d love to hear from you.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div
                  className={`px-6 py-4 rounded-lg ${
                    isDark ? "bg-gray-750" : "bg-indigo-50"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      isDark ? "text-indigo-300" : "text-indigo-700"
                    }`}
                  >
                    Name
                  </p>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Prerit Tyagi, Nitika
                  </p>
                </div>
                <div
                  className={`px-6 py-4 rounded-lg ${
                    isDark ? "bg-gray-750" : "bg-indigo-50"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      isDark ? "text-indigo-300" : "text-indigo-700"
                    }`}
                  >
                    Email
                  </p>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    nitika030204@gmail.com
                  </p>
                </div>
                <div
                  className={`px-6 py-4 rounded-lg ${
                    isDark ? "bg-gray-750" : "bg-indigo-50"
                  }`}
                >
                  <p
                    className={`font-medium ${
                      isDark ? "text-indigo-300" : "text-indigo-700"
                    }`}
                  >
                    Github
                  </p>
                  <Link
                    href={"https://github.com/Nitika89/Medihelp"}
                    className={`${isDark ? "text-gray-300" : "text-gray-700"}`}
                  >
                    https://github.com/Nitika89/Medihelp
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer
        className={`mt-24 py-6 ${isDark ? "bg-gray-900" : "bg-indigo-100/50"} 
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
        transition-all duration-1000 delay-500 ease-out`}
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
                href="#"
                className={`${
                  isDark
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-600 hover:text-indigo-700"
                } 
                text-sm hover:underline transition-colors duration-300`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`${
                  isDark
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-600 hover:text-indigo-700"
                } 
                text-sm hover:underline transition-colors duration-300`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`${
                  isDark
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-gray-600 hover:text-indigo-700"
                } 
                text-sm hover:underline transition-colors duration-300`}
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
