import { Button } from "@/components/ui/button";
import { Smartphone, Download, CheckCircle } from "lucide-react";

const MobileAppSection = () => {
  const features = [
    "Access discussions on the go",
    "Real-time chat with members",
    "Push notifications for events",
    "Offline access to resources",
  ];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/downloads/Teksoft_Community.apk";
    link.download = "Teksoft_Community.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Smartphone className="w-4 h-4" />
              Mobile App Available
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Take Teksoft Community <span className="text-primary">Everywhere</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6">
              Download our Android app and stay connected with the tech community anytime, anywhere. 
              Get instant access to discussions, events, and connect with fellow developers on the go.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleDownload}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Download className="w-5 h-5" />
                Download for Android
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="bg-muted px-3 py-1 rounded-full">APK</span>
                <span>Version 1.0</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              * Android 7.0 or higher required. Enable "Install from unknown sources" in your device settings.
            </p>
          </div>

          {/* Phone Mockup Illustration */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Decorative background circles */}
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
              
              {/* Phone mockup */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-background rounded-[2.5rem] overflow-hidden w-64 h-[500px] relative">
                  {/* Status bar */}
                  <div className="bg-muted px-6 py-2 flex justify-between items-center text-xs text-muted-foreground">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                      <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                      <div className="w-6 h-3 bg-green-500 rounded-sm" />
                    </div>
                  </div>
                  
                  {/* App content preview */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-6">
                      <img 
                        src="/favicon.png" 
                        alt="Teksoft Logo" 
                        className="w-10 h-10 rounded-xl"
                      />
                      <div>
                        <h3 className="font-semibold text-sm text-foreground">Teksoft Community</h3>
                        <p className="text-xs text-muted-foreground">Connect & Innovate</p>
                      </div>
                    </div>
                    
                    {/* Mock content cards */}
                    <div className="space-y-3">
                      <div className="bg-muted rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20" />
                          <div className="h-2 bg-muted-foreground/30 rounded w-20" />
                        </div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-full mb-1" />
                        <div className="h-2 bg-muted-foreground/20 rounded w-3/4" />
                      </div>
                      
                      <div className="bg-muted rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-accent/30" />
                          <div className="h-2 bg-muted-foreground/30 rounded w-24" />
                        </div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-full mb-1" />
                        <div className="h-2 bg-muted-foreground/20 rounded w-2/3" />
                      </div>
                      
                      <div className="bg-primary/10 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary/30" />
                          <div className="h-2 bg-primary/40 rounded w-16" />
                        </div>
                        <div className="h-2 bg-primary/30 rounded w-full mb-1" />
                        <div className="h-2 bg-primary/30 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom nav mockup */}
                  <div className="absolute bottom-0 left-0 right-0 bg-muted border-t border-border p-4 flex justify-around">
                    <div className="w-6 h-6 rounded-full bg-primary" />
                    <div className="w-6 h-6 rounded-full bg-muted-foreground/30" />
                    <div className="w-6 h-6 rounded-full bg-muted-foreground/30" />
                    <div className="w-6 h-6 rounded-full bg-muted-foreground/30" />
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -right-4 top-20 bg-white shadow-lg rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Free Download</span>
              </div>
              
              <div className="absolute -left-4 bottom-32 bg-white shadow-lg rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Android App</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
