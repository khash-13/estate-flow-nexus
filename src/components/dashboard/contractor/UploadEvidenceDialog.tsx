
import { useState, useEffect } from "react";
import { 
  DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Camera, Upload, XCircle, FileImage } from "lucide-react";
import { CONSTRUCTION_PHASES, ConstructionPhase } from "@/types/construction";

interface UploadEvidenceDialogProps {
  onOpenChange: (open: boolean) => void;
  projects: {
    name: string;
    units: string[];
  }[];
  tasks: {
    id: string;
    title: string;
    project: string;
    unit: string;
    phase: string;
  }[];
  onSubmit: (evidence: any) => void;
}

interface PhotoEvidence {
  id: string;
  title: string;
  project: string;
  unit: string;
  task: string;
  date: string;
  category: string;
  status: 'completed' | 'in_progress' | 'pending_review';
  images: { url: string; caption: string }[];
}

const UploadEvidenceDialog = ({ onOpenChange, projects, tasks, onSubmit }: UploadEvidenceDialogProps) => {
  const [title, setTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [notes, setNotes] = useState("");
  const [progressPercent, setProgressPercent] = useState("50");
  const [status, setStatus] = useState<"in_progress" | "completed" | "pending_review">("in_progress");
  const [photos, setPhotos] = useState<File[]>([]);
  const [availableUnits, setAvailableUnits] = useState<string[]>([]);
  const [availableTasks, setAvailableTasks] = useState<typeof tasks>([]);
  const [selectedPhase, setSelectedPhase] = useState<ConstructionPhase | "">("");
  const [photoCaptions, setPhotoCaptions] = useState<string[]>([]);
  
  // Update units when project changes
  useEffect(() => {
    if (selectedProject) {
      const projectData = projects.find(p => p.name === selectedProject);
      setAvailableUnits(projectData?.units || []);
      setSelectedUnit("");
    } else {
      setAvailableUnits([]);
    }
  }, [selectedProject, projects]);
  
  // Update available tasks when project and unit change
  useEffect(() => {
    if (selectedProject && selectedUnit) {
      const filteredTasks = tasks.filter(t => 
        t.project === selectedProject && t.unit === selectedUnit
      );
      setAvailableTasks(filteredTasks);
      
      if (filteredTasks.length > 0) {
        // Auto select the first task if there's only one
        if (filteredTasks.length === 1) {
          setSelectedTask(filteredTasks[0].id);
          setSelectedPhase(filteredTasks[0].phase as ConstructionPhase);
        } else {
          setSelectedTask("");
        }
      } else {
        setSelectedTask("");
        setSelectedPhase("");
      }
    } else {
      setAvailableTasks([]);
      setSelectedTask("");
      setSelectedPhase("");
    }
  }, [selectedProject, selectedUnit, tasks]);
  
  // Update phase when task changes
  useEffect(() => {
    if (selectedTask) {
      const task = tasks.find(t => t.id === selectedTask);
      if (task) {
        setSelectedPhase(task.phase as ConstructionPhase);
      }
    }
  }, [selectedTask, tasks]);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to array and append to existing photos
      const newFiles = Array.from(e.target.files);
      setPhotos(prevPhotos => [...prevPhotos, ...newFiles]);
      
      // Add empty captions for new photos
      setPhotoCaptions(prevCaptions => [
        ...prevCaptions,
        ...newFiles.map(() => "")
      ]);
    }
  };
  
  // Remove a photo from the list
  const removePhoto = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    setPhotoCaptions(prevCaptions => prevCaptions.filter((_, i) => i !== index));
  };
  
  const updateCaption = (index: number, caption: string) => {
    setPhotoCaptions(prevCaptions => prevCaptions.map((c, i) => i === index ? caption : c));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedProject) {
      toast.error("Please select a project");
      return;
    }
    
    if (!selectedUnit) {
      toast.error("Please select a unit/block");
      return;
    }
    
    if (!title) {
      toast.error("Please enter a title for the evidence");
      return;
    }
    
    if (photos.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }
    
    // In a real app, we would upload the photos to storage
    // For now, create local URLs for the photos
    const photoUrls = photos.map((photo, index) => ({
      url: URL.createObjectURL(photo),
      caption: photoCaptions[index] || `Photo ${index + 1}`
    }));
    
    // Create new evidence object
    const newEvidence: PhotoEvidence = {
      id: `pe${Date.now()}`,
      title,
      project: selectedProject,
      unit: selectedUnit,
      task: selectedTask 
        ? tasks.find(t => t.id === selectedTask)?.title || ""
        : "",
      date: new Date().toISOString().split('T')[0],
      category: selectedPhase || "other",
      status,
      images: photoUrls
    };
    
    // Call the onSubmit handler with the new evidence
    onSubmit(newEvidence);
    
    // Show success message
    toast.success("Evidence uploaded successfully", {
      description: status === "completed" 
        ? "Task has been marked as completed and sent for verification"
        : "Task progress has been updated"
    });
    
    // Reset form
    setTitle("");
    setSelectedProject("");
    setSelectedUnit("");
    setSelectedTask("");
    setNotes("");
    setProgressPercent("50");
    setStatus("in_progress");
    setPhotos([]);
    setPhotoCaptions([]);
  };

  return (
    <DialogContent className="sm:max-w-[650px]">
      <DialogHeader>
        <DialogTitle>Upload Task Evidence</DialogTitle>
        <DialogDescription>
          Upload photos showing task progress or completion. Select the project, unit, and provide details.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject} required>
              <SelectTrigger id="project">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={project.name} value={project.name}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="unit">Unit/Block</Label>
            <Select value={selectedUnit} onValueChange={setSelectedUnit} required disabled={!selectedProject}>
              <SelectTrigger id="unit">
                <SelectValue placeholder={selectedProject ? "Select unit/block" : "Select a project first"} />
              </SelectTrigger>
              <SelectContent>
                {availableUnits.map(unit => (
                  <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Evidence Title</Label>
          <Input 
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this evidence"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="task">Related Task (Optional)</Label>
          <Select value={selectedTask} onValueChange={setSelectedTask} disabled={!selectedUnit}>
            <SelectTrigger id="task">
              <SelectValue placeholder={availableTasks.length > 0 ? "Select related task" : "No tasks available"} />
            </SelectTrigger>
            <SelectContent>
              {availableTasks.map(task => (
                <SelectItem key={task.id} value={task.id}>{task.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedTask ? (
          <div className="bg-muted p-3 rounded-md">
            <p className="font-medium">
              {tasks.find(t => t.id === selectedTask)?.title}
            </p>
            <p className="text-sm text-muted-foreground">
              Phase: {selectedPhase && CONSTRUCTION_PHASES[selectedPhase]?.title}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="phase">Construction Phase</Label>
            <Select 
              value={selectedPhase} 
              onValueChange={(value) => setSelectedPhase(value as ConstructionPhase)} 
              required={!selectedTask}
            >
              <SelectTrigger id="phase">
                <SelectValue placeholder="Select construction phase" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CONSTRUCTION_PHASES).map(([key, phase]) => (
                  <SelectItem key={key} value={key}>{phase.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as any)} required>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending_review">Pending Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {status === "in_progress" && (
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
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="photos">Upload Photos</Label>
            <span className="text-xs text-muted-foreground">{photos.length} photos selected</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
            {photos.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground">
                <FileImage className="h-10 w-10 mb-2" />
                <p className="text-sm text-center">No photos selected. Click below to upload.</p>
              </div>
            )}
            
            {photos.map((photo, index) => (
              <div key={index} className="relative rounded-md overflow-hidden border border-border flex flex-col">
                <img 
                  src={URL.createObjectURL(photo)}
                  alt={`Evidence ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <Input 
                    size={1}
                    placeholder="Add caption"
                    value={photoCaptions[index] || ""}
                    onChange={(e) => updateCaption(index, e.target.value)}
                    className="text-xs"
                  />
                </div>
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
            Please upload clear photos showing the construction progress. GPS location will be automatically added.
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
