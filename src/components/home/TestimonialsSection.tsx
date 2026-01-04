import { useState } from "react";
import SectionTitle from "../SectionTitle";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Mark",
      role: "Software Engineer",
      company: "TechCorp",
      image: "/john mark.jpg",
      quote: "Being a part of the Tech Team community has been invaluable for my career growth. The educational resources and networking opportunities have helped me stay at the cutting edge of technology."
    },
    {
      name: "Jeremy bravoge",
      role: "Backend Developer",
      company: "TechCorp",
      image: "/john mark.jpg",
      quote: "Being part of this team has impact me alot on my tech journey and i really appreciate alot from this team."
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

        <div className="mt-16 relative max-w-5xl mx-auto">
          {/* Main Testimonial Card - High-Impact UI */}
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl border-t-4 border-techgold transition-all duration-500 ease-in-out">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

              {/* Image & Avatar Section */}
              <div className="md:w-1/4 flex flex-col items-center text-center">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="rounded-full w-28 h-28 object-cover border-4 border-techgold shadow-lg mb-4 transform group-hover:scale-105 transition-transform"
                />
                <p className="font-extrabold text-2xl text-techgold">{currentTestimonial.name}</p>
                <p className="text-gray-400 text-sm italic">
                  {currentTestimonial.role} @ {currentTestimonial.company}
                </p>
              </div>

              {/* Quote Section */}
              <div className="md:w-3/4 relative">
                {/* Large, Custom Quote Icon */}
                <MessageSquareQuote className="absolute top-[-30px] left-0 h-16 w-16 text-techgold opacity-20 transform -translate-x-4 -translate-y-4 hidden sm:block" />

                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 pl-4 border-l-4 border-techgold/50">
                  {currentTestimonial.quote}
                </p>

              </div>
            </div>
          </div>

          {/* Navigation and Indicators - Improved UX */}
          <div className="flex justify-center mt-12 gap-4">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-techgold shadow-md hover:bg-yellow-600 text-black transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              aria-label="Previous testimonial"
              disabled={testimonials.length <= 1}
            >
              <ChevronLeft className="h-6 w-6 font-bold" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-3 w-3 rounded-full transition-colors duration-300 ${index === activeIndex ? 'bg-techgold shadow-lg shadow-techgold/50' : 'bg-gray-700 hover:bg-gray-600'}`}
                ></button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-techgold shadow-md hover:bg-yellow-600 text-black transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              aria-label="Next testimonial"
              disabled={testimonials.length <= 1}
            >
              <ChevronRight className="h-6 w-6 font-bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
