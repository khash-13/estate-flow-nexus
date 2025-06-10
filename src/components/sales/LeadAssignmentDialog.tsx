
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";
import { Lead } from "@/types/lead";
import { formatIndianCurrency } from "@/lib/formatCurrency";

interface LeadAssignmentDialogProps {
  unassignedLeads: Lead[];
  agents: string[];
  onAssignLead: (leadId: string, agentName: string) => void;
}

export function LeadAssignmentDialog({ unassignedLeads, agents, onAssignLead }: LeadAssignmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<string>("");

  const handleAssign = () => {
    if (selectedLead && selectedAgent) {
      onAssignLead(selectedLead, selectedAgent);
      setOpen(false);
      setSelectedLead("");
      setSelectedAgent("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Leads
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Lead to Agent</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select Lead</label>
            <Select value={selectedLead} onValueChange={setSelectedLead}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose a lead to assign" />
              </SelectTrigger>
              <SelectContent>
                {unassignedLeads.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.customerName} - {lead.property} ({formatIndianCurrency(lead.value)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Select Agent</label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose an agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent} value={agent}>
                    {agent}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLead && (
            <Card>
              <CardContent className="p-4">
                {(() => {
                  const lead = unassignedLeads.find(l => l.id === selectedLead);
                  if (!lead) return null;
                  return (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{lead.customerName}</h4>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                        <Badge>{lead.priority} priority</Badge>
                      </div>
                      <p className="text-sm">Property: {lead.property}</p>
                      <p className="text-sm">Value: {formatIndianCurrency(lead.value)}</p>
                      <p className="text-sm">Stage: {lead.stage}</p>
                      {lead.notes && <p className="text-sm text-muted-foreground">{lead.notes}</p>}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedLead || !selectedAgent}>
              Assign Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
