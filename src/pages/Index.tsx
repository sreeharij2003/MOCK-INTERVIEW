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

const Index = () => {
  // We'll keep the context to pass to Header, but always show the landing page
  // regardless of authentication status
  const { isSignedIn, isLoaded } = useAuthContext();

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
