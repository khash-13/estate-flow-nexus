
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building, 
  Users, 
  Image, 
  FileText, 
  MapPin,
  Edit,
  Save,
  Plus,
  Trash2
} from "lucide-react";
import HeroSectionCMS from "@/components/cms/HeroSectionCMS";
import AboutSectionCMS from "@/components/cms/AboutSectionCMS";
import PropertiesCMS from "@/components/cms/PropertiesCMS";
import ContactCMS from "@/components/cms/ContactCMS";

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("hero");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management System</h1>
          <p className="text-muted-foreground">
            Manage all visual components of your public website
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Live Website
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            About Section
          </TabsTrigger>
          <TabsTrigger value="properties" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Contact Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <HeroSectionCMS />
        </TabsContent>

        <TabsContent value="about">
          <AboutSectionCMS />
        </TabsContent>

        <TabsContent value="properties">
          <PropertiesCMS />
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Gallery management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <ContactCMS />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
