
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, X, UploadCloud, Image as ImageIcon, BadgeIndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { Property, PropertyType } from "@/types/property";
import { Separator } from "@/components/ui/separator";

// Form schema validation
const propertyFormSchema = z.object({
  memNo: z.string().min(1, "Membership number is required"),
  projectName: z.string().min(1, "Project name is required"),
  plotNo: z.string().min(1, "Plot number is required"),
  propertyType: z.enum(["Villa", "Apartment", "Plot", "Land Parcel"]).default("Villa"),
  villaFacing: z.enum(["North", "East", "West", "South", "North-East", "North-West", "South-East", "South-West"]),
  extent: z.coerce.number().positive("Extent must be a positive number"),
  customerName: z.string().optional(),
  customerStatus: z.enum(["Purchased", "Inquiry", "Blocked", "Open"]),
  status: z.enum(["Available", "Sold", "Under Construction", "Reserved", "Blocked"]),
  contractor: z.string().optional(),
  siteIncharge: z.string().optional(),
  totalAmount: z.coerce.number().positive("Total amount must be a positive number"),
  workCompleted: z.coerce.number().min(0, "Work completed percentage must be between 0 and 100").max(100),
  deliveryDate: z.date({
    required_error: "Delivery date is required",
  }),
  emiScheme: z.boolean().default(false),
  contactNo: z.string().optional(),
  agentName: z.string().optional(),
  registrationStatus: z.enum(["Completed", "In Progress", "Pending", "Not Started"]),
  ratePlan: z.string().optional(),
  amountReceived: z.coerce.number().min(0, "Amount received must be a positive number"),
  balanceAmount: z.coerce.number().min(0, "Balance amount must be a positive number"),
  remarks: z.string().optional(),
  municipalPermission: z.boolean().default(false),
  googleMapsLocation: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  images: z.array(z.string()).optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: PropertyFormValues) => void;
  onCancel: () => void;
}

export function PropertyForm({ property, onSubmit, onCancel }: PropertyFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(property?.images || []);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(property?.thumbnailUrl || "");

  const isEditing = !!property;
  
  // Convert the property data to form values if editing
  const defaultValues: Partial<PropertyFormValues> = property
    ? {
        ...property,
        propertyType: property.propertyType || "Villa",
        deliveryDate: property.deliveryDate ? new Date(property.deliveryDate) : undefined,
        images: property.images || [],
      }
    : {
        propertyType: "Villa",
        customerStatus: "Open",
        status: "Available",
        workCompleted: 0,
        registrationStatus: "Not Started",
        emiScheme: false,
        municipalPermission: false,
        amountReceived: 0,
        balanceAmount: 0,
        images: [],
      };

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues,
  });

  // Watch form values for validation and calculations
  const totalAmount = form.watch("totalAmount");
  const amountReceived = form.watch("amountReceived");
  const propertyType = form.watch("propertyType");

  // Update balance amount when total or received amount changes
  const recalculateBalance = () => {
    if (totalAmount && amountReceived) {
      const balance = totalAmount - amountReceived;
      form.setValue("balanceAmount", balance >= 0 ? balance : 0);
    }
  };

  // Handle file uploads for multiple property images
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setImageFiles(prev => [...prev, ...newFiles]);
      
      // Create preview URLs for the images
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...newUrls]);
      
      // Update form value
      form.setValue("images", [...(form.getValues("images") || []), ...newUrls]);
    }
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      form.setValue("thumbnailUrl", previewUrl);
    }
  };

  // Remove an image
  const removeImage = (indexToRemove: number) => {
    setImageUrls(prev => prev.filter((_, index) => index !== indexToRemove));
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    
    const currentImages = form.getValues("images") || [];
    form.setValue("images", currentImages.filter((_, index) => index !== indexToRemove));
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
    form.setValue("thumbnailUrl", "");
  };

  // Call on mount and when values change
  React.useEffect(() => {
    recalculateBalance();
  }, [totalAmount, amountReceived]);

  const handleSubmit = async (data: PropertyFormValues) => {
    if (!user || !["owner", "admin"].includes(user.role)) {
      toast.error("You don't have permission to perform this action");
      return;
    }

    setLoading(true);
    try {
      // In a real application, you would upload the images to a server here
      // and then update the data with the image URLs

      onSubmit({
        ...data,
        images: imageUrls,
        thumbnailUrl: thumbnailPreview,
      });
      toast.success(isEditing ? "Property updated successfully" : "Property added successfully");
    } catch (error) {
      console.error("Error submitting property form:", error);
      toast.error("Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              Enter the basic details of the property
            </p>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Membership Number */}
            <FormField
              control={form.control}
              name="memNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Number</FormLabel>
                  <FormControl>
                    <Input placeholder="MEM001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Name */}
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Green Valley Villas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Plot Number */}
            <FormField
              control={form.control}
              name="plotNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plot Number</FormLabel>
                  <FormControl>
                    <Input placeholder="A-123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Type */}
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Plot">Plot</SelectItem>
                      <SelectItem value="Land Parcel">Land Parcel</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Villa Facing - Only show for Villa and Apartment types */}
            {(propertyType === "Villa" || propertyType === "Apartment") && (
              <FormField
                control={form.control}
                name="villaFacing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facing Direction</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select direction" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="East">East</SelectItem>
                        <SelectItem value="West">West</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                        <SelectItem value="North-East">North-East</SelectItem>
                        <SelectItem value="North-West">North-West</SelectItem>
                        <SelectItem value="South-East">South-East</SelectItem>
                        <SelectItem value="South-West">South-West</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Extent */}
            <FormField
              control={form.control}
              name="extent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extent (sq. ft)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium">Customer Information</h3>
            <p className="text-sm text-muted-foreground">
              Enter customer and status details
            </p>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Customer Name */}
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Customer Status */}
            <FormField
              control={form.control}
              name="customerStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Purchased">Purchased</SelectItem>
                      <SelectItem value="Inquiry">Inquiry</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                      <SelectItem value="Under Construction">Under Construction</SelectItem>
                      <SelectItem value="Reserved">Reserved</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Number */}
            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 98765 43210" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Agent Name */}
            <FormField
              control={form.control}
              name="agentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Robert Wilson" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium">Construction Details</h3>
            <p className="text-sm text-muted-foreground">
              Enter construction and project management details
            </p>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contractor */}
            <FormField
              control={form.control}
              name="contractor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contractor</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Contractors" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Site Incharge */}
            <FormField
              control={form.control}
              name="siteIncharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Incharge</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Work Completed */}
            <FormField
              control={form.control}
              name="workCompleted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Completed (%)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" max="100" placeholder="75" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Date */}
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Municipal Permission */}
            <FormField
              control={form.control}
              name="municipalPermission"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Municipal Permission</FormLabel>
                    <FormDescription>
                      Property has the required municipal permissions
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium">Financial Details</h3>
            <p className="text-sm text-muted-foreground">
              Enter payment and financial information
            </p>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Amount */}
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount (₹)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BadgeIndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="5000000" 
                        {...field} 
                        className="pl-10"
                        onChange={(e) => {
                          field.onChange(e);
                          recalculateBalance();
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Received */}
            <FormField
              control={form.control}
              name="amountReceived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Received (₹)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BadgeIndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="2500000" 
                        {...field} 
                        className="pl-10"
                        onChange={(e) => {
                          field.onChange(e);
                          recalculateBalance();
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Balance Amount */}
            <FormField
              control={form.control}
              name="balanceAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance Amount (₹)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <BadgeIndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="2500000" 
                        {...field} 
                        className="pl-10"
                        readOnly 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMI Scheme */}
            <FormField
              control={form.control}
              name="emiScheme"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>EMI Scheme</FormLabel>
                    <FormDescription>
                      Property is available under EMI scheme
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Registration Status */}
            <FormField
              control={form.control}
              name="registrationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select registration status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rate Plan */}
            <FormField
              control={form.control}
              name="ratePlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate Plan (Scheme)</FormLabel>
                  <FormControl>
                    <Input placeholder="Standard Plan" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium">Property Images & Location</h3>
            <p className="text-sm text-muted-foreground">
              Upload images and location details for the property
            </p>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thumbnail Upload */}
            <div className="space-y-4">
              <FormLabel>Main Property Image</FormLabel>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Property Thumbnail"
                      className="mx-auto mb-2 max-h-40 rounded"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 bg-white/80 rounded-full"
                      onClick={removeThumbnail}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="flex flex-col items-center justify-center h-40 cursor-pointer"
                    onClick={() => document.getElementById("thumbnailUpload")?.click()}
                  >
                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Click to upload main image</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      The main image will be displayed on property cards
                    </p>
                  </div>
                )}
                <Input
                  id="thumbnailUpload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                />
              </div>
            </div>

            {/* Google Maps Location */}
            <FormField
              control={form.control}
              name="googleMapsLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps Location</FormLabel>
                  <FormControl>
                    <Input placeholder="https://maps.google.com/?q=..." {...field} value={field.value || ''} />
                  </FormControl>
                  <FormDescription>
                    Enter the Google Maps URL or coordinates for this property
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Images Upload */}
          <div className="space-y-4">
            <FormLabel>Additional Property Images</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="flex flex-wrap gap-4 mb-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative w-32 h-32">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-0 right-0 bg-white/80 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div 
                  className="w-32 h-32 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded cursor-pointer"
                  onClick={() => document.getElementById("imagesUpload")?.click()}
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground text-center">Add Images</p>
                </div>
                
                <Input
                  id="imagesUpload"
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          {/* Remarks */}
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional notes about the property"
                    className="resize-none"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Property" : "Add Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
