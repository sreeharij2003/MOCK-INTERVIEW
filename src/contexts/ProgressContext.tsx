
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
  resetUserData: () => void;
}

const initialContext: ProgressContextType = {
  sessions: [],
  remainingAttempts: 3,
  isTrialExpired: false,
  isPremium: false,
  skills: [],
  addSession: () => {},
  upgradeAccount: () => {},
  resetUserData: () => {},
};

export const ProgressContext = createContext<ProgressContextType>(initialContext);

export const useProgress = () => useContext(ProgressContext);

// Initial default skills
const defaultSkills: SkillScore[] = [
  { name: "Communication", score: 0, lastChange: 'unchanged' },
  { name: "Problem Solving", score: 0, lastChange: 'unchanged' },
  { name: "Technical Knowledge", score: 0, lastChange: 'unchanged' },
  { name: "Confidence", score: 0, lastChange: 'unchanged' }
];

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isPremium, setIsPremium] = useState(false);
  const [skills, setSkills] = useState<SkillScore[]>(defaultSkills);

  // Get current user email to use as key for localStorage
  const getUserKey = (): string => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return user.email || 'default-user';
      }
      return 'default-user';
    } catch (err) {
      console.error("Error getting user key:", err);
      return 'default-user';
    }
  };

  // Generate storage keys specific to the current user
  const getStorageKey = (key: string): string => {
    const userKey = getUserKey();
    return `${userKey}-${key}`;
  };

  // Reset user data when they log out
  const resetUserData = () => {
    setSessions([]);
    setRemainingAttempts(3);
    setIsPremium(false);
    setSkills([...defaultSkills]);
  };

  // Load data from localStorage on initial load - make sure this runs only once
  useEffect(() => {
    try {
      const userKey = getUserKey();
      
      const storedSessions = localStorage.getItem(getStorageKey('interview_sessions'));
      const storedAttempts = localStorage.getItem(getStorageKey('remaining_attempts'));
      const storedPremium = localStorage.getItem(getStorageKey('is_premium'));
      const storedSkills = localStorage.getItem(getStorageKey('skills'));
      
      console.log(`Loading data for user: ${userKey}`);
      
      if (storedSessions) setSessions(JSON.parse(storedSessions));
      if (storedAttempts) setRemainingAttempts(parseInt(storedAttempts, 10));
      if (storedPremium) setIsPremium(JSON.parse(storedPremium));
      if (storedSkills) setSkills(JSON.parse(storedSkills));
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      // Initialize with default values if there's an error
      resetUserData();
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      // Only save data if we have a user
      if (getUserKey() !== 'default-user') {
        localStorage.setItem(getStorageKey('interview_sessions'), JSON.stringify(sessions));
        localStorage.setItem(getStorageKey('remaining_attempts'), String(remainingAttempts));
        localStorage.setItem(getStorageKey('is_premium'), JSON.stringify(isPremium));
        localStorage.setItem(getStorageKey('skills'), JSON.stringify(skills));
        console.log(`Saved data for user: ${getUserKey()}`);
      }
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [sessions, remainingAttempts, isPremium, skills]);

  // Load user data when user changes
  useEffect(() => {
    const handleUserChange = () => {
      try {
        const userKey = getUserKey();
        console.log(`User changed to: ${userKey}`);
        
        // Reset data first
        resetUserData();
        
        // Then load user-specific data if it exists
        const storedSessions = localStorage.getItem(getStorageKey('interview_sessions'));
        const storedAttempts = localStorage.getItem(getStorageKey('remaining_attempts'));
        const storedPremium = localStorage.getItem(getStorageKey('is_premium'));
        const storedSkills = localStorage.getItem(getStorageKey('skills'));
        
        if (storedSessions) setSessions(JSON.parse(storedSessions));
        if (storedAttempts) setRemainingAttempts(parseInt(storedAttempts, 10));
        if (storedPremium) setIsPremium(JSON.parse(storedPremium));
        if (storedSkills) setSkills(JSON.parse(storedSkills));
      } catch (error) {
        console.error("Error handling user change:", error);
        resetUserData();
      }
    };
    
    // Set up event listener for user changes
    window.addEventListener('user-changed', handleUserChange);
    
    // Check user on mount
    handleUserChange();
    
    return () => {
      window.removeEventListener('user-changed', handleUserChange);
    };
  }, []);

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
        let lastChange: 'improved' | 'declined' | 'unchanged';
        if (newScore > skill.score) {
          lastChange = 'improved';
        } else if (newScore < skill.score) {
          lastChange = 'declined';
        } else {
          lastChange = 'unchanged';
        }
        
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
        resetUserData,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
