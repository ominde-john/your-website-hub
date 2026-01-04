import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Globe, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";

const MemberDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl p-10 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-techblue">Teksoft Hub</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          A growing community where developers, tech students, and innovators connect. Since you are not yet registered, this is a preview of member benefits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-gray-100 rounded-xl text-left"><Users className="h-8 w-8 text-techblue mb-3" /><h3 className="font-semibold text-xl mb-2">Meet Developers</h3><p className="text-gray-600 text-sm">Connect with tech talents from Kenya and beyond.</p></div>
          <div className="p-6 bg-gray-100 rounded-xl text-left"><Globe className="h-8 w-8 text-techblue mb-3" /><h3 className="font-semibold text-xl mb-2">Access Resources</h3><p className="text-gray-600 text-sm">Tutorials, projects, and mentorship.</p></div>
          <div className="p-6 bg-gray-100 rounded-xl text-left"><Smartphone className="h-8 w-8 text-techblue mb-3" /><h3 className="font-semibold text-xl mb-2">Mobile Access</h3><p className="text-gray-600 text-sm">Learn on the go with our mobile app.</p></div>
          <div className="p-6 bg-gray-100 rounded-xl text-left"><ShieldCheck className="h-8 w-8 text-techblue mb-3" /><h3 className="font-semibold text-xl mb-2">Secure Platform</h3><p className="text-gray-600 text-sm">Your data is protected.</p></div>
        </div>
        <Button asChild size="lg" className="bg-techblue hover:bg-techblue-dark text-white">
          <Link to="/contact">Register Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
};

export default MemberDashboardPage;
