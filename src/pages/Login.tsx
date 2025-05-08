
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/App";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isLoaded } = useAuthContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoggingIn(true);
    try {
      // Mock OAuth authentication
      const success = await signIn("demo@example.com", "password123");
      if (success) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Sign in failed. Please try again.");
      }
    } catch (err) {
      console.error("OAuth error", err);
      toast.error("Sign in failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);
    
    try {
      if (!email || !password) {
        setError("Email and password are required");
        return;
      }
      
      const success = await signIn(email, password);
      if (success) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (err: any) {
      console.error("Sign in error", err);
      setError(err.message || "Sign in failed. Please try again.");
      toast.error("Sign in failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Log in to your InterviewAce account</p>
          </div>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleEmailSignIn} className="space-y-6">
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
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Log in with Email"}
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
                onClick={() => handleOAuthSignIn("google")}
                className="w-full"
                disabled={isLoggingIn}
              >
                Google
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOAuthSignIn("github")}
                className="w-full"
                disabled={isLoggingIn}
              >
                GitHub
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <a
                href="/signup"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
