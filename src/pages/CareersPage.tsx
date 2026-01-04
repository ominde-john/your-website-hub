import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CareersPage = () => {
  const jobs = [
    { id: 1, title: "Senior Full Stack Engineer", department: "Software Development", location: "Nairobi, Kenya (Hybrid)", type: "Full-time" },
    { id: 2, title: "UI/UX Product Designer", department: "Product & Design", location: "Virtual (Global)", type: "Full-time" },
    { id: 3, title: "Data Science Intern", department: "Data & Analytics", location: "Nairobi, Kenya", type: "Internship" },
    { id: 4, title: "DevOps Engineer", department: "Infrastructure", location: "Virtual (Remote)", type: "Contract" },
  ];

  return (
    <div>
      <PageHeader title="Careers at Tech Team" description="Join our mission to empower technology across Africa" />
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.department}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-techblue" />{job.location}</p>
                    <p className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-techblue" />{job.type}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-techblue hover:bg-techblue-dark text-white">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
