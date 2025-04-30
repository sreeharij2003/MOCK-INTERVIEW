
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  
  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const handleOAuthSignUp = async (provider: "oauth_google" | "oauth_github") => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
      // No need to set active session here since we're redirecting
    } catch (err) {
      console.error("OAuth error", err);
      toast.error("Sign up failed. Please try again.");
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        // Handle verification steps if needed
        console.log("Additional verification needed", result);
      }
    } catch (err: any) {
      console.error("Sign up error", err);
      toast.error(err.errors?.[0]?.message || "Sign up failed. Please try again.");
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
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up with Email
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
                onClick={() => handleOAuthSignUp("oauth_google")}
                className="w-full"
              >
                Google
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOAuthSignUp("oauth_github")}
                className="w-full"
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
