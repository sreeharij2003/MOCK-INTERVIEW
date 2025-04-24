
import React from "react";
import { 
  Video, 
  Check, 
  FileText, 
  Clock, 
  Mic 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <Video className="h-6 w-6 text-blue-600" />,
      title: "Technical Interviews",
      description: "Practice coding problems, system design, and technical questions with our AI interviewer customized for your role.",
    },
    {
      icon: <Mic className="h-6 w-6 text-blue-600" />,
      title: "Behavioral Interviews",
      description: "Master STAR method responses with personalized feedback on your communication skills and body language.",
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "AI Feedback & Analysis",
      description: "Receive detailed reports highlighting your strengths and areas for improvement after each practice session.",
    },
    {
      icon: <Check className="h-6 w-6 text-blue-600" />,
      title: "Personalized Practice",
      description: "Custom interview questions based on your industry, role, and experience level.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Flexible Scheduling",
      description: "Practice whenever you want with 24/7 access to AI interview sessions that fit your schedule.",
    },
  ];

  return (
    <section id="features" className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Level Up Your Interview Skills
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our AI-powered interview platform offers a comprehensive set of tools to help you prepare for any type of interview.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader>
                <div className="p-2 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <div className="border border-blue-200 rounded-xl p-8 bg-white shadow-sm max-w-3xl">
            <h3 className="text-xl font-bold text-center mb-6">How InterviewAce Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-medium mb-2">Create Your Profile</h4>
                <p className="text-sm text-gray-500">Set up your experience, target roles, and interview preferences</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-medium mb-2">Practice Interviews</h4>
                <p className="text-sm text-gray-500">Engage with our AI interviewers in realistic simulations</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <h4 className="font-medium mb-2">Get Feedback</h4>
                <p className="text-sm text-gray-500">Receive personalized reports and improvement tips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
