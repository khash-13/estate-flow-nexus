
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Edit,
  Save,
  Plus,
  Trash2,
  Image,
  Eye,
  Upload
} from "lucide-react";

const HeroSectionCMS = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Your Dream Home Awaits",
      subtitle: "Discover luxury living in our premium residential developments",
      cta: "Explore Properties",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Premium Plot Developments",
      subtitle: "Invest in carefully planned residential plots with modern amenities",
      cta: "View Open Plots",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Quality Construction",
      subtitle: "Experience excellence in every detail of our construction projects",
      cta: "Our Projects",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ]);

  const [editingSlide, setEditingSlide] = useState(null);

  const handleSave = () => {
    setIsEditing(false);
    setEditingSlide(null);
    // Here you would typically save to backend/database
    console.log("Saving hero slides:", slides);
  };

  const addNewSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: "New Slide Title",
      subtitle: "New slide subtitle",
      cta: "Call to Action",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (id) => {
    setSlides(slides.filter(slide => slide.id !== id));
  };

  const updateSlide = (id, field, value) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Hero Section Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage the main hero slider on your homepage
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
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Hero Slides ({slides.length})</h3>
          <Button onClick={addNewSlide} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Slide
          </Button>
        </div>

        <div className="grid gap-4">
          {slides.map((slide, index) => (
            <Card key={slide.id} className="p-4">
              <div className="flex gap-4">
                <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Slide {index + 1}</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeSlide(slide.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`title-${slide.id}`}>Title</Label>
                        <Input
                          id={`title-${slide.id}`}
                          value={slide.title}
                          onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`cta-${slide.id}`}>Call to Action</Label>
                        <Input
                          id={`cta-${slide.id}`}
                          value={slide.cta}
                          onChange={(e) => updateSlide(slide.id, 'cta', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor={`subtitle-${slide.id}`}>Subtitle</Label>
                        <Textarea
                          id={`subtitle-${slide.id}`}
                          value={slide.subtitle}
                          onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor={`image-${slide.id}`}>Image URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`image-${slide.id}`}
                            value={slide.image}
                            onChange={(e) => updateSlide(slide.id, 'image', e.target.value)}
                          />
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold">{slide.title}</h4>
                      <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                      <Badge variant="outline" className="mt-2">{slide.cta}</Badge>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSectionCMS;
