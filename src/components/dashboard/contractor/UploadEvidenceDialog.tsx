
import { useState } from "react";
import { 
  DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Camera, Upload, XCircle } from "lucide-react";

interface UploadEvidenceDialogProps {
  onOpenChange: (open: boolean) => void;
}

// Sample tasks in progress (in a real app, this would come from an API)
const sampleTasksInProgress = [
  {
    id: "t1",
    title: "Structural column formwork",
    project: "Riverside Tower",
    unit: "Block B",
    phase: "Structural Framework"
  },
  {
    id: "t2",
    title: "Electrical conduiting - Ground Floor",
    project: "Valley Heights",
    unit: "Unit 3",
    phase: "Electrical Works"
  }
];

const UploadEvidenceDialog = ({ onOpenChange }: UploadEvidenceDialogProps) => {
  const [taskId, setTaskId] = useState("");
  const [notes, setNotes] = useState("");
  const [progressPercent, setProgressPercent] = useState("50");
  const [newStatus, setNewStatus] = useState("in_progress");
  const [photos, setPhotos] = useState<File[]>([]);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to array and append to existing photos
      const newFiles = Array.from(e.target.files);
      setPhotos(prevPhotos => [...prevPhotos, ...newFiles]);
    }
  };
  
  // Remove a photo from the list
  const removePhoto = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!taskId) {
      toast.error("Please select a task");
      return;
    }
    
    if (photos.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }
    
    // In a real app, we would upload the photos and update the task status
    
    // Show success message
    toast.success("Evidence uploaded successfully", {
      description: newStatus === "completed" 
        ? "Task has been marked as completed and sent for verification"
        : "Task progress has been updated"
    });
    
    // Reset form and close dialog
    setTaskId("");
    setNotes("");
    setProgressPercent("50");
    setNewStatus("in_progress");
    setPhotos([]);
    onOpenChange(false);
  };

  const selectedTask = sampleTasksInProgress.find(task => task.id === taskId);

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Upload Task Evidence</DialogTitle>
        <DialogDescription>
          Upload photos showing task progress or completion. GPS location will be automatically added.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="task">Select Task</Label>
          <Select value={taskId} onValueChange={setTaskId} required>
            <SelectTrigger id="task">
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {sampleTasksInProgress.map(task => (
                <SelectItem key={task.id} value={task.id}>
                  {task.title} ({task.project} / {task.unit})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedTask && (
          <div className="bg-muted p-3 rounded-md">
            <p className="font-medium">{selectedTask.title}</p>
            <p className="text-sm text-muted-foreground">
              {selectedTask.project} / {selectedTask.unit}
            </p>
            <p className="text-sm text-muted-foreground">
              Phase: {selectedTask.phase}
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="status">Update Status</Label>
          <Select value={newStatus} onValueChange={setNewStatus} required>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="progress">Progress Percentage</Label>
          <div className="flex items-center space-x-2">
            <Input 
              id="progress" 
              type="range" 
              min="0" 
              max="100" 
              step="5"
              className="w-full" 
              value={progressPercent}
              onChange={(e) => setProgressPercent(e.target.value)}
            />
            <span className="w-12 text-center">{progressPercent}%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="photos">Upload Photos</Label>
          <div className="grid grid-cols-2 gap-4 mb-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative rounded-md overflow-hidden border border-border">
                <img 
                  src={URL.createObjectURL(photo)}
                  alt={`Evidence ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon"
                  className="absolute top-1 right-1 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full"
                  onClick={() => removePhoto(index)}
                >
                  <XCircle className="h-4 w-4 text-white" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline"
              className="flex-1 border-dashed"
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="border-dashed"
              onClick={() => document.getElementById("camera-capture")?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <Input 
            id="photo-upload" 
            type="file"
            className="hidden" 
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <Input 
            id="camera-capture" 
            type="file"
            className="hidden" 
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
          <p className="text-xs text-muted-foreground">
            Please upload clear photos showing the task progress. GPS location will be automatically added.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any relevant details or comments"
            rows={3}
          />
        </div>
        
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Submit Evidence</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default UploadEvidenceDialog;
