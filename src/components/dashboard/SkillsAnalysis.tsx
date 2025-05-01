
import React from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { BarChart, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SkillsAnalysis: React.FC = () => {
  const { skills, sessions } = useProgress();
  
  if (sessions.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <BarChart size={18} className="text-blue-600" />
          Skills Analysis
        </h3>
        <p className="text-sm text-gray-500">
          Complete at least one interview to see your skills analysis.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <BarChart size={18} className="text-blue-600" />
        Skills Analysis
      </h3>
      
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm">{skill.name}</span>
                {skill.lastChange === 'improved' && (
                  <TrendingUp size={14} className="text-green-600" />
                )}
                {skill.lastChange === 'declined' && (
                  <TrendingDown size={14} className="text-red-600" />
                )}
              </div>
              <span className="text-sm font-medium">{skill.score}/5</span>
            </div>
            <Progress 
              value={skill.score * 20} 
              className={`h-2 ${
                skill.lastChange === 'improved' ? 'bg-green-100' : 
                skill.lastChange === 'declined' ? 'bg-red-100' : ''
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsAnalysis;
