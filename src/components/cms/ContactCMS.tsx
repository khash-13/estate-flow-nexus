
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Edit,
  Save,
  Eye,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";

const ContactCMS = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: "+91 6300380596",
    email: "info@cskrealtors.com",
    address: "123 Business District, Tech City, State 12345",
    workingHours: "Monday - Saturday: 9:00 AM - 6:00 PM",
    companyName: "CSK REALTORS",
    aboutText: "Leading real estate developer with 15+ years of experience in creating exceptional residential and commercial spaces.",
    socialMedia: {
      facebook: "https://facebook.com/cskrealtors",
      twitter: "https://twitter.com/cskrealtors",
      linkedin: "https://linkedin.com/company/cskrealtors",
      instagram: "https://instagram.com/cskrealtors"
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving contact info:", contactInfo);
  };

  const updateField = (field, value) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };

  const updateSocialMedia = (platform, value) => {
    setContactInfo({
      ...contactInfo,
      socialMedia: {
        ...contactInfo.socialMedia,
        [platform]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Contact Information Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage contact details, business hours, and company information
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            {isEditing ? (
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={contactInfo.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    value={contactInfo.workingHours}
                    onChange={(e) => updateField('workingHours', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="aboutText">About Text</Label>
                  <Textarea
                    id="aboutText"
                    value={contactInfo.aboutText}
                    onChange={(e) => updateField('aboutText', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-estate-navy rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-estate-navy rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-estate-navy rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-estate-navy rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-muted-foreground">{contactInfo.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Media Management */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={contactInfo.socialMedia.facebook}
                  onChange={(e) => updateSocialMedia('facebook', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  value={contactInfo.socialMedia.twitter}
                  onChange={(e) => updateSocialMedia('twitter', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={contactInfo.socialMedia.linkedin}
                  onChange={(e) => updateSocialMedia('linkedin', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={contactInfo.socialMedia.instagram}
                  onChange={(e) => updateSocialMedia('instagram', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="font-medium">Facebook</p>
                <p className="text-sm text-muted-foreground truncate">{contactInfo.socialMedia.facebook}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="font-medium">Twitter</p>
                <p className="text-sm text-muted-foreground truncate">{contactInfo.socialMedia.twitter}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="font-medium">LinkedIn</p>
                <p className="text-sm text-muted-foreground truncate">{contactInfo.socialMedia.linkedin}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="font-medium">Instagram</p>
                <p className="text-sm text-muted-foreground truncate">{contactInfo.socialMedia.instagram}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactCMS;
