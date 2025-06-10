
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Mail, Eye, Edit, Clock, MapPin } from "lucide-react";
import { Lead } from "@/types/lead";
import { formatIndianCurrency } from "@/lib/formatCurrency";

interface LeadCardProps {
  lead: Lead;
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onCall: (lead: Lead) => void;
  onEmail: (lead: Lead) => void;
}

export function LeadCard({ lead, onView, onEdit, onCall, onEmail }: LeadCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-slate-100 text-slate-800';
      case 'qualification': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closing': return 'bg-green-100 text-green-800';
      case 'won': return 'bg-green-500 text-white';
      case 'lost': return 'bg-red-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>
                  {lead.customerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{lead.customerName}</h4>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => onView(lead)}>
                <Eye className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => onEdit(lead)}>
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{lead.property}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {formatIndianCurrency(lead.value)}
            </span>
            <div className="flex space-x-2">
              <Badge className={getStageColor(lead.stage)}>
                {lead.stage}
              </Badge>
              <Badge className={`${getPriorityColor(lead.priority)} text-white`}>
                {lead.priority}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{lead.probability}% probability</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(lead.lastContact).toLocaleDateString()}
            </span>
          </div>

          {lead.assignedAgent && (
            <div className="text-sm text-muted-foreground">
              Assigned to: {lead.assignedAgent}
            </div>
          )}

          <div className="flex space-x-1">
            <Button size="sm" variant="outline" className="h-7 text-xs flex-1" onClick={() => onCall(lead)}>
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs flex-1" onClick={() => onEmail(lead)}>
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
