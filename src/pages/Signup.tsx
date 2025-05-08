
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/App";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { signIn, isLoaded } = useAuthContext();
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const handleOAuthSignUp = async (provider: string) => {
    setIsRegistering(true);
    try {
      // Mock OAuth signup
      const success = await signIn("demo@example.com", "password123");
      if (success) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } catch (err) {
      console.error("OAuth error", err);
      toast.error("Sign up failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsRegistering(true);
    
    try {
      if (!firstName || !lastName || !email || !password) {
        setError("All fields are required");
        setIsRegistering(false);
        return;
      }
      
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsRegistering(false);
        return;
      }
      
      // Register directly with signIn since we're using mock auth
      const success = await signIn(email, password);
      
      if (success) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        setError("Sign up failed. Please try again.");
        toast.error("Sign up failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Sign up error", err);
      setError(err.message || "Sign up failed. Please try again.");
      toast.error("Sign up failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="mt-2 text-gray-600">Get started with InterviewAce today</p>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleEmailSignUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isRegistering}
            >
              {isRegistering ? "Signing Up..." : "Sign Up with Email"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOAuthSignUp("google")}
                className="w-full"
                disabled={isRegistering}
              >
                Google
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOAuthSignUp("github")}
                className="w-full"
                disabled={isRegistering}
              >
                GitHub
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <a
                href="/login"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
