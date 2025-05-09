
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { useAuthContext } from "@/App";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isSignedIn, isLoaded } = useAuthContext();

  // If the user is already signed in, we should show the landing page
  // rather than redirecting to dashboard, so they can see the marketing content
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
