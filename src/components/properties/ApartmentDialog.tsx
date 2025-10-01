import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Property } from "@/types/property";
import { toast } from "sonner";

interface ApartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apartment?: Property;
  mode: "add" | "edit";
}

export const ApartmentDialog = ({ open, onOpenChange, apartment, mode }: ApartmentDialogProps) => {
  const [formData, setFormData] = useState({
    memNo: apartment?.memNo || "",
    plotNo: apartment?.plotNo || "",
    villaFacing: apartment?.villaFacing || "",
    extent: apartment?.extent || 0,
    propertyType: apartment?.propertyType || "Apartment",
    status: apartment?.status || "Available",
    totalAmount: apartment?.totalAmount || 0,
    ratePlan: apartment?.ratePlan || "",
    deliveryDate: apartment?.deliveryDate || "",
    emiScheme: apartment?.emiScheme || false,
    municipalPermission: apartment?.municipalPermission || false,
    remarks: apartment?.remarks || "",
    thumbnailUrl: apartment?.thumbnailUrl || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the database
    toast.success(mode === "add" ? "Unit created successfully" : "Unit updated successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Unit" : "Edit Unit"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memNo">Membership Number *</Label>
              <Input 
                id="memNo"
                value={formData.memNo}
                onChange={(e) => setFormData({ ...formData, memNo: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plotNo">Plot/Unit Number *</Label>
              <Input 
                id="plotNo"
                value={formData.plotNo}
                onChange={(e) => setFormData({ ...formData, plotNo: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="extent">Extent (sq.ft) *</Label>
              <Input 
                id="extent"
                type="number"
                value={formData.extent}
                onChange={(e) => setFormData({ ...formData, extent: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="villaFacing">Facing</Label>
              <Input 
                id="villaFacing"
                value={formData.villaFacing}
                onChange={(e) => setFormData({ ...formData, villaFacing: e.target.value })}
                placeholder="e.g., North, East"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select 
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Plot">Plot</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Under Construction">Under Construction</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount (₹) *</Label>
              <Input 
                id="totalAmount"
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ratePlan">Rate Plan</Label>
              <Input 
                id="ratePlan"
                value={formData.ratePlan}
                onChange={(e) => setFormData({ ...formData, ratePlan: e.target.value })}
                placeholder="e.g., Standard Plan, Premium Plan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
              <Input 
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
            <Input 
              id="thumbnailUrl"
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea 
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="emiScheme"
                checked={formData.emiScheme}
                onCheckedChange={(checked) => setFormData({ ...formData, emiScheme: checked })}
              />
              <Label htmlFor="emiScheme">EMI Available</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="municipalPermission"
                checked={formData.municipalPermission}
                onCheckedChange={(checked) => setFormData({ ...formData, municipalPermission: checked })}
              />
              <Label htmlFor="municipalPermission">Municipal Permission</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "add" ? "Create Unit" : "Update Unit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};