import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Camera, Calendar, MapPin, X, ChevronLeft, ChevronRight, Download } from "lucide-react";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Events", "Workshops", "Hackathons", "Community", "Tech Talks", "Celebrations"];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      title: "TeksoftCon 2025 Opening Ceremony",
      category: "Events",
      date: "March 2025",
      location: "Nairobi, Kenya",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      title: "Web Development Bootcamp Session",
      category: "Workshops",
      date: "February 2025",
      location: "Virtual",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      title: "AI Hackathon Finals",
      category: "Hackathons",
      date: "January 2025",
      location: "Mombasa, Kenya",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      title: "Community Meetup & Networking",
      category: "Community",
      date: "December 2024",
      location: "Kampala, Uganda",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      title: "Cloud Computing Tech Talk",
      category: "Tech Talks",
      date: "November 2024",
      location: "Nairobi, Kenya",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
      title: "5000 Members Celebration",
      category: "Celebrations",
      date: "October 2024",
      location: "Nairobi, Kenya",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      title: "Cybersecurity Workshop",
      category: "Workshops",
      date: "September 2024",
      location: "Virtual",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=800&q=80",
      title: "Gaming Innovation Showcase",
      category: "Events",
      date: "August 2024",
      location: "Dar es Salaam, Tanzania",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80",
      title: "Mobile App Development Sprint",
      category: "Hackathons",
      date: "July 2024",
      location: "Kigali, Rwanda",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      title: "Leadership Summit 2024",
      category: "Events",
      date: "June 2024",
      location: "Nairobi, Kenya",
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      title: "Team Building Retreat",
      category: "Community",
      date: "May 2024",
      location: "Lake Naivasha, Kenya",
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
      title: "Annual Awards Ceremony",
      category: "Celebrations",
      date: "April 2024",
      location: "Nairobi, Kenya",
    },
  ];

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  const selectedImageData = galleryImages.find(img => img.id === selectedImage);

  return (
    <>
      <Helmet>
        <title>Gallery | Teksoft Community</title>
        <meta
          name="description"
          content="Browse photos from Teksoft Community events, workshops, hackathons, and community gatherings."
        />
      </Helmet>

      <PageHeader
        title="Photo Gallery"
        description="Capturing moments from our events, workshops, and community gatherings"
      />

      {/* Gallery Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Stats Bar */}
          <div className="flex justify-center gap-8 mb-12 animate-fade-up">
            <div className="text-center">
              <span className="text-4xl font-bold text-techblue">500+</span>
              <p className="text-gray-600 text-sm">Photos</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-techgold">50+</span>
              <p className="text-gray-600 text-sm">Events</p>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold text-techblue">10+</span>
              <p className="text-gray-600 text-sm">Countries</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-techblue text-white" : "border-gray-300 hover:border-techblue hover:text-techblue"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block bg-techgold text-gray-900 text-xs font-bold px-2 py-1 rounded mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-white font-semibold text-sm line-clamp-2">{image.title}</h3>
                    <p className="text-gray-300 text-xs mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {image.location}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button className="bg-techblue hover:bg-techblue-dark text-white">
              Load More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-black/95 border-none p-0">
          {selectedImageData && (
            <div className="relative">
              <DialogClose className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                <X className="h-6 w-6" />
              </DialogClose>
              
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <img
                src={selectedImageData.src}
                alt={selectedImageData.title}
                className="w-full max-h-[70vh] object-contain"
              />
              
              <div className="p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block bg-techgold text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {selectedImageData.category}
                    </span>
                    <h3 className="text-xl font-bold">{selectedImageData.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {selectedImageData.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {selectedImageData.location}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="border-techgold text-techgold hover:bg-techgold hover:text-gray-900">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-techblue to-techblue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Share Your <span className="text-techgold">Moments</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Have photos from Teksoft events? We'd love to feature them in our gallery!
          </p>
          <Button
            size="lg"
            className="bg-techgold hover:bg-techgold-dark text-gray-900 font-bold animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Submit Your Photos
          </Button>
        </div>
      </section>
    </>
  );
};

export default GalleryPage;
