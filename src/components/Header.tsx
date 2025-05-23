
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, LogOut, User, UserCog, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/App";
import { useProgress } from "@/contexts/ProgressContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSignedIn, isLoaded, user, signOut } = useAuthContext();
  const { resetUserData } = useProgress();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToProfile = () => {
    // Navigate to profile page - we'll implement the actual navigation
    navigate("/profile");
    toast({
      title: "Profile",
      description: "Navigating to profile page",
    });
  };

  const goToSettings = () => {
    // Navigate to settings page - we'll implement the actual navigation
    navigate("/settings");
    toast({
      title: "Settings",
      description: "Navigating to settings page",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div 
          onClick={goToHome}
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
            <Home className="text-white h-5 w-5" />
          </div>
          <span className="font-bold text-xl">InterviewAce</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#features" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </a>
          <a 
            href="#testimonials" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Testimonials
          </a>
          <a 
            href="#pricing" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </a>
          <a 
            href="#faq" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            FAQ
          </a>
          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="mr-2 hover:bg-primary/10" 
                onClick={goToDashboard}
              >
                Dashboard
              </Button>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      <User size={18} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={goToProfile}>
                      <UserCog className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={goToDashboard}>
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={goToSettings}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="mr-2 hover:bg-primary/10" 
                onClick={handleLogin}
              >
                Log In
              </Button>
              <Button 
                onClick={handleSignUp}
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={toggleMobileMenu}
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              {isLoaded && isSignedIn ? (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary/10"
                    onClick={() => {
                      goToDashboard();
                      toggleMobileMenu();
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full hover:bg-primary/10"
                    onClick={() => {
                      goToProfile();
                      toggleMobileMenu();
                    }}
                  >
                    <UserCog size={16} className="mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full hover:bg-primary/10"
                    onClick={() => {
                      goToSettings();
                      toggleMobileMenu();
                    }}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      handleSignOut();
                      toggleMobileMenu();
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary/10"
                    onClick={() => {
                      handleLogin();
                      toggleMobileMenu();
                    }}
                  >
                    Log In
                  </Button>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      handleSignUp();
                      toggleMobileMenu();
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
