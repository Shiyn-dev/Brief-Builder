"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Instagram, Linkedin, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@/components/google-login";
import { Logo } from "@/components/logo";

export default function CompleteBriefPage() {
  const { id } = useParams();
  const [briefData, setBriefData] = useState<any>(null);
  const [formData, setFormData] = useState({
    yourName: "",
    sendToEmail: "",
    agreeToTerms: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [briefName, setBriefName] = useState<string>("Your Brief");

  useEffect(() => {
    console.log("Brief ID:", id);
    console.log("URL:", window.location.href);

    const fetchAnswers = async () => {
      try {
        setLoading(true);
        // Get saved answers from localStorage
        const savedAnswers = localStorage.getItem("briefAnswers");
        if (!savedAnswers) {
          throw new Error("Answers not found");
        }

        console.log("Saved answers:", savedAnswers);

        const answers = JSON.parse(savedAnswers);

        // Get the brief name and questions
        const briefRes = await fetch(`https://brief-builder.onrender.com/api/briefs/${id}`);

        if (briefRes.ok) {
          const briefInfo = await briefRes.json();
          if (briefInfo && briefInfo.name) {
            setBriefName(briefInfo.name);
          }
        }

        // Get question texts
        const questionsRes = await fetch(`https://brief-builder.onrender.com/api/questions/brief/${id}`);

        if (!questionsRes.ok) {
          throw new Error(`Error loading questions: ${questionsRes.status}`);
        }

        const questions = await questionsRes.json();

        // Format data for display
        const formattedAnswers = Object.entries(answers).map(([questionId, response]) => {
          const question = questions.find((q: any) => q.id === Number(questionId));
          return {
            questionId,
            questionText: question ? question.name : "Question",
            response
          };
        });

        setBriefData({
          id,
          answers: formattedAnswers
        });
        setError(null);
      } catch (err: any) {
        console.error("Error loading answers:", err);
        setError(err.message || "An error occurred while loading answers");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAnswers();
  }, [id]);

  const isFormValid = () => {
    return (
        formData.yourName.trim() !== "" &&
        formData.sendToEmail.trim() !== "" &&
        formData.agreeToTerms
    );
  };

  const handleSendEmail = async () => {
    if (!isFormValid()) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const savedAnswers = localStorage.getItem("briefAnswers");
      if (!savedAnswers) {
        throw new Error("Answers not found");
      }

      console.log("Sending to API:", `https://brief-builder.onrender.com/api/briefs/${id}/send-pdf`);

      // Prepare data in the format required by the API
      const parsedAnswers = JSON.parse(savedAnswers);
      const answersArray = Object.entries(parsedAnswers).map(([questionId, response]) => {
        // Convert answers to the API format
        return {
          questionId: parseInt(questionId),
          textAnswer: typeof response === 'string' ? response : undefined,
          selectedOptionIds: Array.isArray(response) ? [] : undefined  // In the API, we need to add option IDs, not their names
        };
      });

      // Create user and request for sending
      const requestData = {
        briefId: parseInt(id as string),
        user: {
          name: formData.yourName,
          email: formData.sendToEmail
        },
        answers: answersArray
      };

      console.log("Sending data:", JSON.stringify(requestData));

      const res = await fetch(`https://brief-builder.onrender.com/api/briefs/${id}/send-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      if (!res.ok) {
        console.error("Error sending:", res.status);
        throw new Error(`Send error: ${res.status}`);
      }

      const result = await res.json();
      console.log("API Response:", result);

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (err: any) {
      console.error("Error sending email:", err);
      setError(err.message || "An error occurred while sending the email");
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F0F9FA" }}>
          <div className="p-10 text-center">Loading...</div>
        </div>
    );
  }

  if (error && !briefData) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F0F9FA" }}>
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <p className="text-red-600">{error}</p>
            </div>
            <Button onClick={() => window.history.back()}>Back</Button>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen" style={{ backgroundColor: "#F0F9FA" }}>
        <header className="px-6 py-4" style={{ backgroundColor: "#F0F9FA" }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <GoogleLogin />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Brief Summary */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Brief:</h2>

                <div className="space-y-6">
                  {briefData && briefData.answers && briefData.answers.map((answer: any, index: number) => (
                      <div key={index}>
                        <h3 className="font-medium text-gray-900 mb-2">{answer.questionText}</h3>
                        <div className="flex items-start">
                          <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: "#68B3C0" }}></div>
                          <span className="text-gray-700">
                        {Array.isArray(answer.response)
                            ? answer.response.join(", ")
                            : answer.response || "Not specified"}
                      </span>
                        </div>
                        <hr className="mt-3 border-gray-200" />
                      </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <span className="text-gray-400 text-sm">
                    {`1/${Math.ceil((briefData?.answers?.length || 0) / 3)}`}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                  className="w-full text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#68B3C0" }}
                  asChild
              >
                <Link href={`/brief/${id}`}>
                  Edit
                </Link>
              </Button>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Congratulations!</h1>
                <p className="text-xl text-gray-700">Your {briefName} brief is ready!</p>
              </div>

              <div className="space-y-6">
                {/* Your Name */}
                <div className="space-y-2">
                  <Label htmlFor="yourName" className="text-base font-medium text-gray-700">
                    Your name
                  </Label>
                  <Input
                      id="yourName"
                      type="text"
                      value={formData.yourName}
                      onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                      placeholder="Your name"
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{
                        focusRingColor: "#68B3C0",
                        "--tw-ring-color": "#68B3C0"
                      } as React.CSSProperties}
                  />
                </div>

                {/* Send to Email */}
                <div className="space-y-2">
                  <Label htmlFor="sendToEmail" className="text-base font-medium text-gray-700">
                    Send to your email:
                  </Label>
                  <Input
                      id="sendToEmail"
                      type="email"
                      value={formData.sendToEmail}
                      onChange={(e) => setFormData({ ...formData, sendToEmail: e.target.value })}
                      placeholder="Email"
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{
                        focusRingColor: "#68B3C0",
                        "--tw-ring-color": "#68B3C0"
                      } as React.CSSProperties}
                  />
                </div>

                {/* Agreement */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                      className="mt-1"
                      style={{
                        accentColor: "#68B3C0"
                      }}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <Link href="#" className="underline" style={{ color: "#68B3C0" }}>
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="underline" style={{ color: "#68B3C0" }}>
                      privacy policy
                    </Link>
                  </Label>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {/* Send Button */}
                <Button
                    onClick={handleSendEmail}
                    disabled={!isFormValid() || isSending}
                    className={`w-full py-4 text-white rounded-lg text-lg font-medium transition-opacity ${
                        !isFormValid() || isSending ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                    style={{ backgroundColor: "#68B3C0" }}
                    size="lg"
                >
                  {isSending ? "Sending..." : "Send"}
                </Button>

                {showSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 text-center text-green-600 font-medium rounded-lg">
                      Check your email! Your brief has been sent successfully.
                    </div>
                )}
              </div>

              {/* Footer Section */}
              <div className="text-center space-y-6 pt-8">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Your opinion matters</p>
                  <Link href="#" className="text-sm underline hover:opacity-80" style={{ color: "#68B3C0" }}>
                    Share your feedback about the product
                  </Link>
                  <span className="text-sm text-gray-600"> — we use every review to make improvements.</span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-3">Our social media</p>
                  <div className="flex justify-center space-x-4">
                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                      <Instagram className="w-6 h-6" />
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                      <Linkedin className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}