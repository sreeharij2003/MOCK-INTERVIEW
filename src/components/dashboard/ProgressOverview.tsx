
import { useProgress } from "@/contexts/ProgressContext";
import { Award, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProgressOverview = () => {
  const { sessions, skills } = useProgress();

  // Calculate overall progress
  const calculateOverallProgress = (): number => {
    if (sessions.length === 0) return 0;
    
    // Average of session scores
    const totalScore = sessions.reduce((sum, session) => sum + session.score, 0);
    const averageScore = totalScore / sessions.length;
    
    // Convert to percentage (assuming score is out of 5)
    return Math.min(100, Math.round((averageScore / 5) * 100));
  };

  // Calculate skill improvement
  const skillsImproved = skills.filter(skill => skill.lastChange === 'improved').length;
  const skillsDeclined = skills.filter(skill => skill.lastChange === 'declined').length;

  const progressPercentage = calculateOverallProgress();
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm border border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <Award className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold">Your Progress</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Interviews Completed</div>
          <div className="text-2xl font-bold">{sessions.length}</div>
        </div>
        
        {sessions.length > 0 && (
          <>
            <div>
              <div className="text-sm text-gray-500 mb-1">Overall Progress</div>
              <div className="text-2xl font-bold">{progressPercentage}%</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 mb-1">Skill Changes</div>
              <div className="flex items-center gap-4">
                {skillsImproved > 0 && (
                  <div className="flex items-center text-green-600">
                    <TrendingUp size={18} className="mr-1" />
                    <span className="text-lg font-bold">{skillsImproved}</span>
                  </div>
                )}
                {skillsDeclined > 0 && (
                  <div className="flex items-center text-red-600">
                    <TrendingDown size={18} className="mr-1" />
                    <span className="text-lg font-bold">{skillsDeclined}</span>
                  </div>
                )}
                {skillsImproved === 0 && skillsDeclined === 0 && (
                  <span className="text-lg font-bold">No changes</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      
      {sessions.length > 0 ? (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      ) : (
        <p className="text-gray-500">Complete interviews to track your progress.</p>
      )}
    </div>
  );
};

export default ProgressOverview;
