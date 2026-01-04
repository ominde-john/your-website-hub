import { useState } from "react";
import SectionTitle from "../SectionTitle";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Mark",
      role: "Software Engineer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote:
        "Being a part of the Tech Team community has been invaluable for my career growth. The educational resources and networking opportunities have helped me stay at the cutting edge of technology.",
    },
    {
      name: "Jeremy Bravoge",
      role: "Backend Developer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      quote:
        "Being part of this team has impacted me a lot on my tech journey and I really appreciate a lot from this team.",
    },
    {
      name: "Sarah Mwangi",
      role: "UI/UX Designer",
      company: "DesignHub",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      quote:
        "The community has opened so many doors for me. From mentorship to job opportunities, Tech Team truly cares about its members' success.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <SectionTitle
          title="What Our Members Say"
          subtitle="Hear from our community members about their experiences with Tech Team"
          centered
        />

        <div className="max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-techgold/10 p-4 rounded-full">
              <MessageSquareQuote className="h-10 w-10 text-techgold" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-700 relative">
            <p className="text-lg md:text-xl text-gray-300 text-center mb-8 leading-relaxed italic">
              "{currentTestimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="flex flex-col items-center">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-techgold mb-4"
              />
              <h4 className="text-lg font-bold text-white">{currentTestimonial.name}</h4>
              <p className="text-techgold text-sm">
                {currentTestimonial.role} at {currentTestimonial.company}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-700 hover:bg-techgold hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-700 hover:bg-techgold hover:text-gray-900 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? "bg-techgold" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
