
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import InterviewSession from "./pages/InterviewSession";
import InterviewResults from "./pages/InterviewResults";
import { ProgressProvider, useProgress } from "./contexts/ProgressContext";

const queryClient = new QueryClient();

// Create auth context
export const AuthContext = createContext<{
  isSignedIn: boolean;
  isLoaded: boolean;
  user: { name?: string; email?: string } | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}>({
  isSignedIn: false,
  isLoaded: false,
  user: null,
  signIn: async () => false,
  signOut: () => {},
});

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuthContext();
  
  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Auth provider hook
export const useAuthContext = () => {
  // Using context directly in the same file where it's created
  return useAuth();
};

const App = () => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <ProgressProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/interview" 
                  element={
                    <ProtectedRoute>
                      <InterviewSetup />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/interview/session" 
                  element={
                    <ProtectedRoute>
                      <InterviewSession />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/interview/results" 
                  element={
                    <ProtectedRoute>
                      <InterviewResults />
                    </ProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ProgressProvider>
    </AuthContext.Provider>
  );
};

// Custom auth hook
function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsSignedIn(true);
    }
    setIsLoaded(true);
  }, []);
  
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, accept any valid email format and password with at least 6 characters
      if (email.includes('@') && password.length >= 6) {
        const userData = { email };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update state
        setUser(userData);
        setIsSignedIn(true);
        
        // Dispatch event for user change
        window.dispatchEvent(new CustomEvent('user-changed'));
        
        console.info('User changed to:', email);
        
        return true;
      } else {
        console.error('Invalid email or password format');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsSignedIn(false);
    
    // Dispatch event for user change
    window.dispatchEvent(new CustomEvent('user-changed'));
  };
  
  return {
    isSignedIn,
    isLoaded,
    user,
    signIn,
    signOut,
  };
}

export default App;
