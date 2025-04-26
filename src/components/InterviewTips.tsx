
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, FileText, HelpCircle, ListCheck } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const tips = [
  {
    icon: ListCheck,
    title: "Interview Preparation Checklist",
    description: "Essential items to review before your interview",
    color: "text-blue-600",
    details: [
      "Research company culture and values",
      "Review the job description thoroughly",
      "Prepare questions for the interviewer",
      "Practice common interview scenarios",
      "Update your portfolio and resume",
      "Check technical requirements for virtual interviews"
    ]
  },
  {
    icon: BookText,
    title: "Common Questions Guide",
    description: "Practice with frequently asked interview questions",
    color: "text-purple-600",
    details: [
      "Tell me about yourself",
      "Why do you want to work here?",
      "What are your greatest strengths?",
      "How do you handle conflict?",
      "Where do you see yourself in 5 years?",
      "Describe a challenging project"
    ]
  },
  {
    icon: FileText,
    title: "Technical Resources",
    description: "Study materials for technical interviews",
    color: "text-green-600",
    details: [
      "Data Structures & Algorithms",
      "System Design Principles",
      "Programming Language Fundamentals",
      "Database Concepts",
      "API Design Best Practices",
      "Cloud Computing Basics"
    ]
  },
  {
    icon: HelpCircle,
    title: "Interview Tips",
    description: "Expert advice for interview success",
    color: "text-orange-600",
    details: [
      "Maintain good eye contact",
      "Use the STAR method for answers",
      "Show enthusiasm and energy",
      "Listen carefully to questions",
      "Follow up after the interview",
      "Dress appropriately"
    ]
  },
];

const InterviewTips = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Interview Tips & Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tips.map((tip, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger asChild>
              <Card className="transition-all hover:shadow-md cursor-pointer hover:-translate-y-1">
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
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <h4 className="font-semibold mb-2">{tip.title}</h4>
              <ul className="space-y-1">
                {tip.details.map((detail, i) => (
                  <li key={i} className="text-sm">
                    • {detail}
                  </li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default InterviewTips;

