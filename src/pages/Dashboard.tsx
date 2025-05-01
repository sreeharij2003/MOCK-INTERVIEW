
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InterviewTips from "@/components/InterviewTips";
import { Play } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import RecentSessions from "@/components/dashboard/RecentSessions";
import SkillsAnalysis from "@/components/dashboard/SkillsAnalysis";
import TrialStatus from "@/components/dashboard/TrialStatus";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isTrialExpired, addSession } = useProgress();

  const handleStartInterview = () => {
    if (isTrialExpired) {
      toast.error("Your trial has expired. Please upgrade to continue.", {
        description: "Upgrade to premium for unlimited interview sessions",
        action: {
          label: "Upgrade",
          onClick: () => {
            // Show upgrade dialog
            document.querySelector("[data-testid='upgrade-button']")?.dispatchEvent(
              new MouseEvent('click', { bubbles: true })
            );
          }
        }
      });
      return;
    }
    
    navigate("/interview");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to InterviewAce</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main content - Interview Launcher & Progress Overview */}
          <div className="md:col-span-3 space-y-6">
            <ProgressOverview />
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-4">Ready to ace your interview?</h2>
              <p className="text-gray-600 mb-6">
                Practice makes perfect. Start a mock interview to improve your skills and receive personalized feedback.
              </p>
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleStartInterview}
              >
                <Play size={18} />
                Take Interview
              </Button>
            </div>
            
            <RecentSessions />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <SkillsAnalysis />
            <TrialStatus />
          </div>
        </div>

        <InterviewTips />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
