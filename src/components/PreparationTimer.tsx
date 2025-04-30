
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Clock, Play } from 'lucide-react';

interface PreparationTimerProps {
  duration?: number; // in seconds
  onComplete: () => void;
  onSkip?: () => void;
}

const PreparationTimer: React.FC<PreparationTimerProps> = ({ 
  duration = 30, 
  onComplete,
  onSkip
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  
  // Calculate progress percentage
  const progress = ((duration - timeRemaining) / duration) * 100;
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, onComplete]);
  
  const startTimer = () => {
    setIsActive(true);
  };
  
  const handleSkip = () => {
    setIsActive(false);
    onSkip ? onSkip() : onComplete();
  };
  
  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Preparation Time</h3>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-center gap-4">
        {!isActive ? (
          <Button onClick={startTimer} className="gap-2">
            <Play size={16} />
            Start Preparation
          </Button>
        ) : (
          <Button variant="outline" onClick={handleSkip}>
            Skip Preparation
          </Button>
        )}
      </div>
      
      <p className="text-sm text-center text-gray-500">
        {!isActive 
          ? "Take a moment to prepare your answer before responding" 
          : "Think about your response. Timer will automatically complete when done."}
      </p>
    </div>
  );
};

export default PreparationTimer;
