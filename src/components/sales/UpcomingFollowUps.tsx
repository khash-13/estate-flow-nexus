
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Phone, Mail } from "lucide-react";
import { FollowUp } from "@/types/lead";

interface UpcomingFollowUpsProps {
  followUps: FollowUp[];
  onComplete: (followUpId: string) => void;
}

export function UpcomingFollowUps({ followUps, onComplete }: UpcomingFollowUpsProps) {
  const upcomingFollowUps = followUps
    .filter(f => !f.completed && new Date(f.scheduledDate) > new Date())
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  const isOverdue = (date: string) => new Date(date) < new Date();
  const isDueToday = (date: string) => {
    const today = new Date();
    const scheduleDate = new Date(date);
    return scheduleDate.toDateString() === today.toDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-estate-navy" />
          Upcoming Follow-ups
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingFollowUps.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No upcoming follow-ups scheduled
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingFollowUps.map((followUp) => (
              <div key={followUp.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{followUp.title}</h4>
                    <p className="text-sm text-muted-foreground">{followUp.description}</p>
                  </div>
                  <div className="flex space-x-1">
                    {isDueToday(followUp.scheduledDate) && (
                      <Badge variant="destructive">Due Today</Badge>
                    )}
                    {isOverdue(followUp.scheduledDate) && (
                      <Badge variant="destructive">Overdue</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(followUp.scheduledDate).toLocaleString()}
                  </span>
                  <span>Assigned to: {followUp.assignedTo}</span>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 text-xs"
                    onClick={() => onComplete(followUp.id)}
                  >
                    Mark Complete
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
