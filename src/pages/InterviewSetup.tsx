
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Video, Mic, MessageSquare, CheckCircle2, Briefcase, Code } from "lucide-react";
import { technicalCategories } from "@/data/technicalQuestions";

const roleOptions = [
  { value: "software-engineer", label: "Software Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "ux-designer", label: "UX Designer" },
  { value: "marketing", label: "Marketing" },
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "backend-developer", label: "Backend Developer" },
  { value: "fullstack-developer", label: "Full Stack Developer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "project-manager", label: "Project Manager" },
  { value: "business-analyst", label: "Business Analyst" },
  { value: "technical-writer", label: "Technical Writer" },
  { value: "ui-designer", label: "UI Designer" }
];

const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior Level" }
];

const InterviewSetup = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [interviewType, setInterviewType] = useState("text");
  const [interviewMode, setInterviewMode] = useState("behavioral");
  const [technicalCategory, setTechnicalCategory] = useState("");
  
  const handleStartInterview = () => {
    navigate("/interview/session", { 
      state: { 
        role: selectedRole, 
        level: selectedLevel, 
        type: interviewType,
        mode: interviewMode,
        category: technicalCategory
      } 
    });
  };

  const isFormValid = () => {
    // For technical interviews, require a category selection
    if (interviewMode === "technical") {
      return selectedRole && selectedLevel && technicalCategory;
    }
    // For behavioral interviews, just need role and level
    return selectedRole && selectedLevel;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Setup Your Interview</h1>
          <p className="text-gray-600 mb-8">
            Customize your mock interview experience based on your preferences
          </p>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Interview Type</CardTitle>
                <CardDescription>
                  Choose what kind of interview you want to practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="behavioral" value={interviewMode} onValueChange={setInterviewMode}>
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="behavioral" className="flex items-center gap-2">
                      <Briefcase size={16} />
                      Behavioral/HR
                    </TabsTrigger>
                    <TabsTrigger value="technical" className="flex items-center gap-2">
                      <Code size={16} />
                      Technical
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="behavioral" className="mt-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-sm">Behavioral Interview</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Practice common HR questions about your experience, behavior, and soft skills.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="technical" className="mt-4">
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-sm">Technical Interview</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Practice technical questions with a 30-second preparation time for each question.
                        </p>
                      </div>
                      
                      <div className="pt-2">
                        <label className="text-sm font-medium mb-1 block">Select Technical Category</label>
                        <Select value={technicalCategory} onValueChange={setTechnicalCategory}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a technical category" />
                          </SelectTrigger>
                          <SelectContent>
                            {technicalCategories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Select Interview Role</CardTitle>
                <CardDescription>
                  Choose the job role you're preparing to interview for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Experience Level</CardTitle>
                <CardDescription>
                  Select your experience level for tailored questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Response Format</CardTitle>
                <CardDescription>
                  Choose how you'd like to respond to interview questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="text" value={interviewType} onValueChange={setInterviewType}>
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <MessageSquare size={16} />
                      Text-based
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex items-center gap-2">
                      <Mic size={16} />
                      Voice-based
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="text" className="mt-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-sm">Text-based Interview</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Type your answers to interview questions. Good for practicing structured responses.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="voice" className="mt-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-sm">Voice-based Interview</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Speak your answers using your microphone. Your responses will be transcribed.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interview Summary</CardTitle>
                <CardDescription>
                  Review your interview settings before starting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>{interviewMode === "behavioral" ? "Behavioral/HR Interview" : "Technical Interview"}</span>
                </div>
                {interviewMode === "technical" && technicalCategory && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-600" />
                    <span>{technicalCategories.find(c => c.value === technicalCategory)?.label}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>{selectedRole ? roleOptions.find(r => r.value === selectedRole)?.label || selectedRole : "No role selected"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>{selectedLevel ? experienceLevels.find(l => l.value === selectedLevel)?.label || selectedLevel : "No level selected"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>{interviewType === "text" ? "Text-based responses" : "Voice-based responses"}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleStartInterview} 
                  disabled={!isFormValid()}
                  className="w-full gap-2"
                >
                  Start Interview
                  <ArrowRight size={16} />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewSetup;
