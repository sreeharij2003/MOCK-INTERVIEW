
import React from "react";
import { useProgress, Session } from "@/contexts/ProgressContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const RecentSessions: React.FC = () => {
  const { sessions } = useProgress();
  
  if (sessions.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed rounded-lg bg-gray-50">
        <p className="text-gray-500">You haven't completed any interview sessions yet.</p>
        <p className="text-gray-500">Start your first interview to see your progress here!</p>
      </div>
    );
  }
  
  // Format session display
  const formatSession = (session: Session) => {
    // Format date as "X time ago"
    const timeAgo = formatDistanceToNow(new Date(session.date), { addSuffix: true });
    
    // Format role with capitalization and hyphen replacement
    const formattedRole = session.role
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return (
      <Card key={session.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="text-lg">{formattedRole}</CardTitle>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= Math.round(session.score) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex gap-2">
                <Badge variant={session.type === "technical" ? "default" : "secondary"}>
                  {session.type === "technical" ? "Technical" : "Behavioral"}
                </Badge>
                {session.category && (
                  <Badge variant="outline">
                    {session.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {timeAgo} • {session.questionsCount} questions • {Math.round(session.duration / 60)} mins
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium">Score</div>
              <div className="text-xl font-bold">{(session.score).toFixed(1)}<span className="text-gray-500 text-sm">/5</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Sessions</h2>
      <div>{sessions.slice(0, 3).map(formatSession)}</div>
    </div>
  );
};

export default RecentSessions;
