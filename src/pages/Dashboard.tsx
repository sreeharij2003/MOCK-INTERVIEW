
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, ChevronRight, Award, BarChart, Clock } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to InterviewAce</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main content - Interview Launcher */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm border border-blue-100">
              <h2 className="text-2xl font-bold mb-4">Ready to ace your interview?</h2>
              <p className="text-gray-600 mb-6">
                Practice makes perfect. Start a mock interview to improve your skills and receive personalized feedback.
              </p>
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate("/interview")}
              >
                <Play size={18} />
                Take Interview
              </Button>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
            <div className="space-y-3">
              {/* Empty state for recent sessions */}
              <div className="text-center py-10 border border-dashed rounded-lg bg-gray-50">
                <p className="text-gray-500">You haven't completed any interview sessions yet.</p>
                <p className="text-gray-500">Start your first interview to see your progress here!</p>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Award size={18} className="text-blue-600" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Interviews Completed</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mt-1">
                    <div className="h-2 bg-blue-600 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <BarChart size={18} className="text-blue-600" />
                Skills Analysis
              </h3>
              <p className="text-sm text-gray-500">
                Complete at least one interview to see your skills analysis.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                Trial Status
              </h3>
              <p className="text-sm text-gray-500">
                Your free trial includes 3 mock interviews.
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span className="font-medium">3/3</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-1">
                  <div className="h-2 bg-green-600 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
