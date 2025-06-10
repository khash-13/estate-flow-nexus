
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportLeadsDialogProps {
  onImportLeads: (leads: any[]) => void;
}

export function ImportLeadsDialog({ onImportLeads }: ImportLeadsDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a CSV file",
        variant: "destructive",
      });
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const leads = lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(',').map(v => v.trim());
        const lead: any = {};
        
        headers.forEach((header, index) => {
          lead[header] = values[index] || '';
        });
        
        // Convert numeric fields
        if (lead.value) lead.value = parseFloat(lead.value);
        if (lead.probability) lead.probability = parseInt(lead.probability);
        
        return {
          ...lead,
          id: Date.now() + Math.random(),
          stage: 'prospecting',
          createdAt: new Date().toISOString(),
          lastContact: new Date().toISOString(),
        };
      });

      onImportLeads(leads);
      toast({
        title: "Import successful",
        description: `${leads.length} leads imported successfully`,
      });
      setOpen(false);
      setFile(null);
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to parse CSV file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTemplate = () => {
    const template = `customerName,email,phone,property,value,probability,source,priority,notes
John Doe,john@example.com,9876543210,Skyline Towers,5000000,60,website,medium,Interested in 3BHK
Jane Smith,jane@example.com,9876543211,Golden Heights,7500000,40,referral,high,Looking for luxury apartment`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import Leads
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Leads from CSV</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Upload CSV File</Label>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>
          
          {file && (
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-sm">{file.name}</span>
              </div>
            </div>
          )}

          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!file || isLoading}
            >
              {isLoading ? "Importing..." : "Import Leads"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
