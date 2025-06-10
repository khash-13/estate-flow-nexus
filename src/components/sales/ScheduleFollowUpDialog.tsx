
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Calendar } from "lucide-react";
import { FollowUp } from "@/types/lead";

interface ScheduleFollowUpDialogProps {
  leadId?: string;
  onScheduleFollowUp: (followUp: Omit<FollowUp, 'id' | 'createdAt'>) => void;
}

export function ScheduleFollowUpDialog({ leadId, onScheduleFollowUp }: ScheduleFollowUpDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm();

  const handleSubmit = (data: any) => {
    const followUp: Omit<FollowUp, 'id' | 'createdAt'> = {
      leadId: leadId || data.leadId,
      title: data.title,
      description: data.description,
      scheduledDate: data.scheduledDate,
      assignedTo: data.assignedTo,
      completed: false,
    };

    onScheduleFollowUp(followUp);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Follow-up
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Follow-up</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow-up Title</FormLabel>
                  <FormControl>
                    <Input {...field} required placeholder="e.g., Property tour follow-up" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="robert-wilson">Robert Wilson</SelectItem>
                        <SelectItem value="emily-davis">Emily Davis</SelectItem>
                        <SelectItem value="david-thompson">David Thompson</SelectItem>
                        <SelectItem value="lisa-anderson">Lisa Anderson</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Follow-up</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
