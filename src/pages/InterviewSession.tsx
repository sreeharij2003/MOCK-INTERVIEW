import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mic, MicOff, Clock } from "lucide-react";
import { toast } from "sonner";

// Mock interview questions based on roles
const interviewQuestions = {
  "software-engineer": {
    "entry": [
      "Tell me about yourself and your programming background.",
      "Explain the difference between a stack and a queue data structure.",
      "How would you approach debugging a web application?",
      "What programming languages are you most comfortable with and why?",
      "How do you keep your technical skills up-to-date?"
    ],
    "mid": [
      "Tell me about a complex technical challenge you've faced and how you solved it.",
      "Explain how you would design a URL shortening service.",
      "How do you approach testing in your development process?",
      "Describe your experience with CI/CD pipelines.",
      "How do you optimize application performance?"
    ],
    "senior": [
      "Tell me about your experience leading technical projects.",
      "How would you design a scalable microservice architecture?",
      "Describe your approach to mentoring junior developers.",
      "How do you balance technical debt with feature development?",
      "Describe how you've implemented system design patterns in previous roles."
    ]
  },
  "product-manager": {
    "entry": [
      "How do you prioritize features for a product?",
      "Tell me about a time when you had to make a decision with limited information.",
      "How do you gather user feedback for products?",
      "What metrics would you use to measure product success?",
      "How do you communicate product requirements to the development team?"
    ],
    "mid": [
      "Tell me about a product launch you managed and what you learned.",
      "How do you balance stakeholder requests with user needs?",
      "Describe how you've used data to make product decisions.",
      "How would you approach a product that's losing market share?",
      "Tell me about how you work with engineers and designers."
    ],
    "senior": [
      "Describe your product strategy experience and methodology.",
      "How do you approach building and leading a product team?",
      "Tell me about a time you had to pivot a product direction.",
      "How do you align product roadmaps with company vision?",
      "Describe how you've managed competing priorities across multiple products."
    ]
  },
  // Default questions for other roles
  "default": [
    "Tell me about yourself and your professional background.",
    "What attracted you to this role?",
    "Describe a challenging situation at work and how you handled it.",
    "What are your greatest professional strengths?",
    "Where do you see yourself in five years?"
  ]
};

const InterviewSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role = "", level = "", type = "text" } = location.state || {};
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [isFinished, setIsFinished] = useState(false);
  
  const {
    transcript,
    isRecording,
    startRecording,
    stopRecording,
    isSupported
  } = useSpeechRecognition();

  // Get questions based on role and level
  const questions = role && level && interviewQuestions[role as keyof typeof interviewQuestions]?.[level as "entry" | "mid" | "senior"] || 
                   interviewQuestions.default;
  
  useEffect(() => {
    // Check if role and level exist in the state
    if (!role || !level) {
      toast.error("Interview setup information missing. Redirecting to setup.");
      navigate("/interview");
      return;
    }
    
    // Reset states when moving to a new question
    setTextAnswer("");
    setTimeRemaining(120);
    
    // Timer for the question
    let timer: NodeJS.Timeout | null = null;
    if (!isFinished) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    // Clean up timer
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentQuestionIndex, isFinished, navigate, role, level]);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  
  const handleNextQuestion = () => {
    // Save current answer
    const currentAnswer = type === "text" ? textAnswer : transcript;
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextAnswer("");
    } else {
      // End of interview
      setIsFinished(true);
      // Stop recording if active
      if (isRecording) {
        stopRecording();
      }
    }
  };
  
  const handleFinishInterview = () => {
    // In a real app, you might send the answers to an API for analysis
    navigate("/interview/results", { 
      state: { 
        role, 
        level, 
        questions, 
        answers: [...answers, type === "text" ? textAnswer : transcript] 
      } 
    });
  };

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Progress percentage
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {isFinished ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Interview Complete!</h2>
              <p className="text-gray-600 mb-8">
                You've completed all the questions. Ready to see your performance?
              </p>
              <Button size="lg" onClick={handleFinishInterview}>
                View Results
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{role ? roleOptions.find(r => r.value === role)?.label : "Interview"}</h1>
                  <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-gray-500" />
                  <span className={`font-mono ${timeRemaining < 30 ? "text-red-600 font-bold" : ""}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
              
              <Progress value={progressPercentage} className="mb-8" />
              
              <Card className="p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {questions[currentQuestionIndex]}
                </h2>
                
                {type === "text" ? (
                  <Textarea
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="min-h-[200px]"
                  />
                ) : (
                  <div className="space-y-4">
                    {!isSupported ? (
                      <div className="text-center p-4 bg-yellow-50 text-yellow-800 rounded-md">
                        Speech recognition is not supported in your browser. Please use a modern browser or switch to text input.
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <Button
                            onClick={toggleRecording}
                            variant={isRecording ? "destructive" : "default"}
                            size="lg"
                            className="gap-2"
                          >
                            {isRecording ? (
                              <>
                                <MicOff size={18} />
                                Stop Recording
                              </>
                            ) : (
                              <>
                                <Mic size={18} />
                                Start Recording
                              </>
                            )}
                          </Button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md min-h-[200px]">
                          <p className="text-sm text-gray-500 mb-2">Your transcribed response:</p>
                          {transcript ? (
                            <p>{transcript}</p>
                          ) : (
                            <p className="text-gray-400 italic">
                              {isRecording ? "Speaking..." : "Click 'Start Recording' and begin speaking"}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Card>
              
              <div className="flex justify-end">
                <Button onClick={handleNextQuestion} className="gap-2">
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Interview"}
                  <ArrowRight size={16} />
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewSession;

// Define TypeScript types outside of the component
const roleOptions = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "ux-designer", label: "UX Designer" },
  { value: "marketing", label: "Marketing" }
];
