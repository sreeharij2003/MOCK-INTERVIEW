
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      const result = await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
      await setActive({ session: result.createdSessionId });
      navigate("/dashboard");
    } catch (err) {
      console.error("OAuth error", err);
      toast.error("Sign in failed. Please try again.");
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        console.log("Additional verification needed", result);
      }
    } catch (err: any) {
      console.error("Sign in error", err);
      toast.error(err.errors?.[0]?.message || "Sign in failed. Please try again.");
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Log in with Email
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
              >
                Google
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOAuthSignIn("github")}
                className="w-full"
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
