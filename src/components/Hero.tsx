import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoDialog from "./VideoDialog";

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const handleStartFreeTrial = () => {
    navigate("/signup");
  };

  const handleWatchDemo = () => {
    setShowVideo(true);
  };

  return (
    <section className="py-12 md:py-24 lg:py-32 hero-pattern">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Ace Your Next Interview with <span className="gradient-text">AI-Powered</span> Mock Sessions
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Practice with our intelligent AI interviewer, get personalized feedback, and build confidence for your real interviews.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-2" onClick={handleStartFreeTrial}>
                Start Free Trial <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={handleWatchDemo}>
                Watch Demo <Video size={16} />
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-300"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-400"></div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-gray-500 flex items-center justify-center text-white font-medium">
                  <span className="text-xs">+</span>
                </div>
              </div>
              <div className="text-gray-500">Join 10,000+ job seekers already practicing</div>
            </div>
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <div className="w-full aspect-video overflow-hidden rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 p-2 shadow-xl">
              <div className="h-full w-full rounded-lg bg-white flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Video size={32} className="text-blue-600" />
                  </div>
                  <p className="text-gray-500">Interactive mock interview demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoDialog isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </section>
  );
};

export default Hero;
