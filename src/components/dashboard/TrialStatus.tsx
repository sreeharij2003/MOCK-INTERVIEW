
import React from "react";
import { useProgress } from "@/contexts/ProgressContext";
import { Clock, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const TrialStatus: React.FC = () => {
  const { remainingAttempts, isTrialExpired, isPremium, upgradeAccount } = useProgress();
  const [showUpgradeDialog, setShowUpgradeDialog] = React.useState(false);
  
  // Show upgrade dialog automatically if trial is expired
  React.useEffect(() => {
    if (isTrialExpired) {
      setShowUpgradeDialog(true);
    }
  }, [isTrialExpired]);
  
  const handleUpgrade = () => {
    upgradeAccount();
    toast.success("Upgraded to Premium successfully!");
    setShowUpgradeDialog(false);
  };
  
  if (isPremium) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Check size={18} className="text-green-600" />
          Premium Status
        </h3>
        <p className="text-sm text-gray-700">
          You have unlimited access to all features as a premium member.
        </p>
        <div className="mt-2">
          <div className="flex justify-between text-sm">
            <span>Access</span>
            <span className="font-medium">Unlimited</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full mt-1">
            <div className="h-2 bg-green-600 rounded-full w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <Clock size={18} className={isTrialExpired ? "text-red-600" : "text-blue-600"} />
          Trial Status
        </h3>
        <p className="text-sm text-gray-500">
          Your free trial includes 3 mock interviews.
        </p>
        <div className="mt-2">
          <div className="flex justify-between text-sm">
            <span>Remaining</span>
            <span className={`font-medium ${isTrialExpired ? "text-red-600" : ""}`}>
              {remainingAttempts}/3
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full mt-1">
            <div 
              className={`h-2 rounded-full ${isTrialExpired ? "bg-red-600" : "bg-green-600"}`} 
              style={{ width: `${(remainingAttempts / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {isTrialExpired && (
          <Button 
            onClick={() => setShowUpgradeDialog(true)} 
            className="w-full mt-4"
            variant="default"
          >
            Upgrade to Premium
          </Button>
        )}
      </div>
      
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to Premium</DialogTitle>
            <DialogDescription>
              Your free trial has ended. Upgrade to premium for unlimited interviews and enhanced features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h4 className="font-medium mb-3">Premium Benefits:</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Unlimited interview sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Detailed performance analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Advanced AI feedback on responses</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Export and share your progress</span>
              </li>
            </ul>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="sm:w-auto w-full">
                Maybe Later
              </Button>
            </DialogClose>
            <Button onClick={handleUpgrade} className="sm:w-auto w-full">
              Upgrade Now - $14.99/month
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrialStatus;
