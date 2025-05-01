
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Session {
  id: string;
  date: string;
  role: string;
  type: "technical" | "behavioral";
  category?: string;
  score: number;
  questionsCount: number;
  duration: number;
}

export interface SkillScore {
  name: string;
  score: number;
  lastChange: 'improved' | 'declined' | 'unchanged';
}

interface ProgressContextType {
  sessions: Session[];
  remainingAttempts: number;
  isTrialExpired: boolean;
  isPremium: boolean;
  skills: SkillScore[];
  addSession: (session: Omit<Session, "id" | "date">) => void;
  upgradeAccount: () => void;
}

const initialContext: ProgressContextType = {
  sessions: [],
  remainingAttempts: 3,
  isTrialExpired: false,
  isPremium: false,
  skills: [],
  addSession: () => {},
  upgradeAccount: () => {},
};

export const ProgressContext = createContext<ProgressContextType>(initialContext);

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isPremium, setIsPremium] = useState(false);
  const [skills, setSkills] = useState<SkillScore[]>([
    { name: "Communication", score: 0, lastChange: 'unchanged' },
    { name: "Problem Solving", score: 0, lastChange: 'unchanged' },
    { name: "Technical Knowledge", score: 0, lastChange: 'unchanged' },
    { name: "Confidence", score: 0, lastChange: 'unchanged' }
  ]);

  // Load data from localStorage on initial load - make sure this runs only once
  useEffect(() => {
    try {
      const storedSessions = localStorage.getItem('interview_sessions');
      const storedAttempts = localStorage.getItem('remaining_attempts');
      const storedPremium = localStorage.getItem('is_premium');
      const storedSkills = localStorage.getItem('skills');
      
      if (storedSessions) setSessions(JSON.parse(storedSessions));
      if (storedAttempts) setRemainingAttempts(parseInt(storedAttempts, 10));
      if (storedPremium) setIsPremium(JSON.parse(storedPremium));
      if (storedSkills) setSkills(JSON.parse(storedSkills));
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      // Initialize with default values if there's an error
      localStorage.setItem('interview_sessions', JSON.stringify([]));
      localStorage.setItem('remaining_attempts', '3');
      localStorage.setItem('is_premium', 'false');
      localStorage.setItem('skills', JSON.stringify([
        { name: "Communication", score: 0, lastChange: 'unchanged' },
        { name: "Problem Solving", score: 0, lastChange: 'unchanged' },
        { name: "Technical Knowledge", score: 0, lastChange: 'unchanged' },
        { name: "Confidence", score: 0, lastChange: 'unchanged' }
      ]));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('interview_sessions', JSON.stringify(sessions));
      localStorage.setItem('remaining_attempts', String(remainingAttempts));
      localStorage.setItem('is_premium', JSON.stringify(isPremium));
      localStorage.setItem('skills', JSON.stringify(skills));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [sessions, remainingAttempts, isPremium, skills]);

  const addSession = (sessionData: Omit<Session, "id" | "date">) => {
    console.log("Adding new session:", sessionData);
    
    // Create a new session with ID and date
    const newSession = {
      ...sessionData,
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
    };
    
    // Add the session to the list
    setSessions(prev => {
      const updatedSessions = [newSession, ...prev];
      console.log("Updated sessions:", updatedSessions);
      return updatedSessions;
    });
    
    // Reduce remaining attempts if not premium
    if (!isPremium) {
      setRemainingAttempts(prev => {
        const updated = Math.max(0, prev - 1);
        console.log("Updated remaining attempts:", updated);
        return updated;
      });
    }
    
    // Update skills based on session performance
    updateSkills(sessionData.score, sessionData.type);
  };

  const updateSkills = (score: number, type: string) => {
    setSkills(prevSkills => {
      const updatedSkills = prevSkills.map(skill => {
        // Randomly determine if this skill was affected by this session
        const wasAffected = Math.random() > 0.3;
        if (!wasAffected) return skill;

        // Calculate new skill score with some randomization
        const scoreChange = (score / 5) * (Math.random() * 0.4 + 0.8);
        let newScore = Math.min(5, Math.max(0, skill.score + scoreChange));
        
        // For technical interviews, boost technical knowledge more
        if (type === "technical" && skill.name === "Technical Knowledge") {
          newScore = Math.min(5, newScore + scoreChange * 0.5);
        }
        
        // Determine if skill improved or declined
        const lastChange = newScore > skill.score ? 'improved' : 
                           newScore < skill.score ? 'declined' : 'unchanged';
        
        return {
          ...skill,
          score: parseFloat(newScore.toFixed(1)),
          lastChange
        };
      });
      
      console.log("Updated skills:", updatedSkills);
      return updatedSkills;
    });
  };

  const upgradeAccount = () => {
    console.log("Upgrading account to premium");
    setIsPremium(true);
    setRemainingAttempts(999); // Unlimited attempts for premium users
  };

  const isTrialExpired = remainingAttempts <= 0 && !isPremium;

  return (
    <ProgressContext.Provider 
      value={{
        sessions,
        remainingAttempts,
        isTrialExpired,
        isPremium,
        skills,
        addSession,
        upgradeAccount,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
