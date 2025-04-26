
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, FileText, HelpCircle, ListCheck } from "lucide-react";

const tips = [
  {
    icon: ListCheck,
    title: "Interview Preparation Checklist",
    description: "Essential items to review before your interview",
    color: "text-blue-600",
  },
  {
    icon: BookText,
    title: "Common Questions Guide",
    description: "Practice with frequently asked interview questions",
    color: "text-purple-600",
  },
  {
    icon: FileText,
    title: "Technical Resources",
    description: "Study materials for technical interviews",
    color: "text-green-600",
  },
  {
    icon: HelpCircle,
    title: "Interview Tips",
    description: "Expert advice for interview success",
    color: "text-orange-600",
  },
];

const InterviewTips = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Interview Tips & Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips.map((tip, index) => (
          <Card 
            key={index}
            className="transition-all hover:shadow-md cursor-pointer hover:-translate-y-1"
          >
            <CardHeader className="space-y-1 flex flex-row items-start gap-4 pb-2">
              <div className={`${tip.color} mt-1`}>
                <tip.icon size={24} />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base leading-none">
                  {tip.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 text-muted-foreground">
                {index === 0 && (
                  <>
                    <li>• Research company background</li>
                    <li>• Prepare STAR examples</li>
                    <li>• Review job requirements</li>
                  </>
                )}
                {index === 1 && (
                  <>
                    <li>• Behavioral questions</li>
                    <li>• Situational scenarios</li>
                    <li>• Leadership examples</li>
                  </>
                )}
                {index === 2 && (
                  <>
                    <li>• Coding challenges</li>
                    <li>• System design basics</li>
                    <li>• Algorithm practice</li>
                  </>
                )}
                {index === 3 && (
                  <>
                    <li>• Body language tips</li>
                    <li>• Question strategies</li>
                    <li>• Follow-up etiquette</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InterviewTips;
