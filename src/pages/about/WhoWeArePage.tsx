import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, ArrowRight, CheckCircle2 } from "lucide-react";

const WhoWeArePage = () => {
  const coreValues = [
    "Innovation-driven approach to technology",
    "Community-first mindset",
    "Continuous learning and growth",
    "Collaborative problem-solving",
    "Ethical and responsible tech practices",
    "Diversity and inclusion in tech",
  ];

  return (
    <div>
      <PageHeader
        title="Who We Are"
        description="Discover the heart and soul of Teksoft Community"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Building Tomorrow's Tech Leaders" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Teksoft Community is a vibrant ecosystem of technology enthusiasts, developers, 
                designers, and innovators united by a shared passion for technology and its 
                potential to transform lives.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded with the vision of bridging the gap between aspiring tech professionals 
                and industry opportunities, we have grown into a thriving community that spans 
                across multiple countries and disciplines.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our members range from curious beginners taking their first steps in coding 
                to seasoned professionals leading major tech initiatives. What unites us is 
                our commitment to learning, sharing, and growing together.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-techblue">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-techblue/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-techblue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                To empower individuals with the skills, resources, and community support 
                needed to thrive in the technology industry, regardless of their background 
                or starting point.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-techgold">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-techgold/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-techgold" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To become the leading technology community in Africa, recognized globally 
                for producing skilled professionals who drive innovation and positive change 
                in their communities.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Our Values</h3>
              </div>
              <p className="text-gray-600">
                We believe in integrity, innovation, collaboration, and the transformative 
                power of technology to create opportunities and solve real-world problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values List */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="What Drives Us" 
            subtitle="The principles that guide our community" 
            centered 
          />
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreValues.map((value, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-techgold flex-shrink-0" />
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-techblue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Become part of a growing network of tech enthusiasts and professionals.
          </p>
          <Button asChild size="lg" className="bg-techgold hover:bg-techgold-dark text-gray-900">
            <Link to="/register" className="flex items-center gap-2">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WhoWeArePage;
