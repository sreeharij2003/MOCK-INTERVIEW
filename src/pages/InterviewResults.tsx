
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Download, BarChart, ThumbsUp, Star } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

// Mock feedback generator - in a real app, this would come from an API
const generateFeedback = (question: string, answer: string) => {
  if (!answer || answer.length < 10) {
    return {
      score: 2,
      feedback: "Your answer was too brief. Consider providing more specific examples and detail.",
      strengths: ["Concise communication"],
      improvements: ["Add more specific details", "Provide concrete examples", "Structure your answer more clearly"]
    };
  } else if (answer.length < 50) {
    return {
      score: 3,
      feedback: "Your answer addressed the question but could use more depth and examples.",
      strengths: ["Clear communication", "Addressed the question"],
      improvements: ["Add more specific examples", "Elaborate on your approach"]
    };
  } else {
    return {
      score: 4,
      feedback: "Strong, detailed answer with good examples and structure.",
      strengths: ["Comprehensive response", "Well-structured", "Good examples"],
      improvements: ["Consider adding quantifiable results"]
    };
  }
};

const InterviewResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addSession } = useProgress();
  
  const { 
    role = "", 
    level = "", 
    mode = "behavioral",
    category = "",
    questions = [], 
    answers = [] 
  } = location.state || {};
  
  // Generate feedback for each answer
  const questionFeedback = questions.map((question: string, index: number) => {
    return {
      question,
      answer: answers[index] || "",
      ...generateFeedback(question, answers[index] || "")
    };
  });
  
  // Calculate overall score
  const overallScore = questionFeedback.reduce((sum, item) => sum + item.score, 0) / 
                      (questionFeedback.length || 1);
  
  // Get common strengths and areas for improvement
  const allStrengths = questionFeedback.flatMap(item => item.strengths);
  const allImprovements = questionFeedback.flatMap(item => item.improvements);
  
  // Count occurrences
  const strengthCounts: Record<string, number> = {};
  const improvementCounts: Record<string, number> = {};
  
  allStrengths.forEach(strength => {
    strengthCounts[strength] = (strengthCounts[strength] || 0) + 1;
  });
  
  allImprovements.forEach(improvement => {
    improvementCounts[improvement] = (improvementCounts[improvement] || 0) + 1;
  });
  
  // Sort by frequency
  const topStrengths = Object.entries(strengthCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([strength]) => strength);
    
  const topImprovements = Object.entries(improvementCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([improvement]) => improvement);
  
  // Save session to progress context
  useEffect(() => {
    // Only save if there are questions and answers
    if (questions.length > 0) {
      addSession({
        role,
        type: mode,
        category,
        score: overallScore,
        questionsCount: questions.length,
        duration: questions.length * 120, // Rough estimate of duration
      });
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleStartNew = () => {
    navigate("/interview");
  };
  
  const handleReturnDashboard = () => {
    navigate("/dashboard");
  };
  
  // Function to render stars based on score
  const renderStars = (score: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={18} 
        className={i < Math.round(score) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
      />
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Interview Results</h1>
          <p className="text-gray-600 mb-8">
            Review your performance and areas for improvement
          </p>
          
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex flex-col items-center">
                <span className="text-lg font-semibold text-gray-600 mb-2">Overall Performance</span>
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(overallScore)}
                </div>
                <span className="text-3xl font-bold">
                  {Math.round(overallScore * 100) / 100}/5
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <ThumbsUp size={18} className="text-green-600" />
                    Your Strengths
                  </h3>
                  <ul className="space-y-2">
                    {topStrengths.map((strength, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-600"></span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart size={18} className="text-blue-600" />
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {topImprovements.map((improvement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-600"></span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-bold mb-4">Question-by-Question Feedback</h2>
          
          {questionFeedback.map((item, index) => (
            <Card key={index} className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                  <div className="flex items-center">
                    {renderStars(item.score)}
                  </div>
                </div>
                <p className="font-medium text-gray-700">{item.question}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">Your Answer:</h4>
                    <p className="mt-1 text-gray-700">{item.answer || "No answer provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">Feedback:</h4>
                    <p className="mt-1">{item.feedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button variant="outline" className="gap-2">
              <Download size={16} />
              Download Results
            </Button>
            <Button onClick={handleStartNew} className="gap-2">
              Practice Again
              <ArrowRight size={16} />
            </Button>
            <Button 
              variant="secondary"
              onClick={handleReturnDashboard}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewResults;
