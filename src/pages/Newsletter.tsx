import React from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Send, 
  Mail, 
  Instagram,
  ArrowUpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterDetail = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      <div className="container-custom py-10 relative">
        
        {/* SIDEBAR SHARE ICONS (Fixed on desktop, top on mobile) */}
        <div className="hidden lg:flex flex-col gap-3 absolute left-0 top-10 items-center">
          <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">Share:</span>
          <button className="p-2 bg-[#3b5998] text-white rounded-full hover:opacity-80 transition-opacity">
            <Facebook className="w-4 h-4" />
          </button>
          <button className="p-2 bg-[#1da1f2] text-white rounded-full hover:opacity-80 transition-opacity">
            <Twitter className="w-4 h-4" />
          </button>
          <button className="p-2 bg-[#25d366] text-white rounded-full hover:opacity-80 transition-opacity">
            <Send className="w-4 h-4 rotate-45" /> {/* Represents WhatsApp/Telegram */}
          </button>
          <button className="p-2 bg-[#0077b5] text-white rounded-full hover:opacity-80 transition-opacity">
            <Linkedin className="w-4 h-4" />
          </button>
          <button className="p-2 bg-[#e1306c] text-white rounded-full hover:opacity-80 transition-opacity">
            <Instagram className="w-4 h-4" />
          </button>
          <button className="p-2 bg-[#ea4335] text-white rounded-full hover:opacity-80 transition-opacity">
            <Mail className="w-4 h-4" />
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-4xl mx-auto">
          {/* Featured Image Placeholder */}
          <div className="w-full aspect-video bg-gray-200 border border-gray-300 rounded-sm shadow-sm mb-6 flex items-center justify-center">
             <span className="text-gray-400 italic">Featured Image Placeholder</span>
          </div>

          <p className="text-center text-[10px] text-gray-400 mb-8 italic">October 22, 2023</p>

          <h1 className="text-2xl md:text-3xl font-bold text-techblue mb-4">
            Bulletin on the International standard of Sustainability Assurance 5000 (ISSA 5000)
          </h1>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-sm font-semibold text-red-600 uppercase">ISSA 5000 BULLETIN</p>
            <p className="text-sm">Sustainability Assurance 5000 (ISSA 5000)</p>
          </div>

          <hr className="my-10 border-dashed border-gray-300" />

          {/* RELATED ARTICLES SECTION */}
          <div className="mb-12">
            <h3 className="text-techgold font-bold mb-6">Related:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm hover:shadow-md transition-shadow">
                <p className="text-techgold font-semibold text-xs mb-2">Pre-event Communique — Apr</p>
                <p className="text-[13px] text-gray-600 line-clamp-2 mb-4">
                  Dear delegate, Thank you for your interest to join us for this year's Annual Governance and Ethics...
                </p>
                <p className="text-[10px] text-gray-400">October 6, 2021</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <p className="text-techgold font-semibold text-xs mb-2 uppercase text-center">
                  THE INAUGURAL DEBT MANAGEMENT SEMINAR
                </p>
                <p className="text-[10px] text-gray-400 text-center">July 20, 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBSCRIPTION FOOTER - MATCHING THE IMAGE SECTION */}
      <div className="bg-techgold relative overflow-hidden py-12">
        {/* Subtle background pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>

        <div className="container-custom relative z-10 text-center text-black">
          <h2 className="text-3xl font-bold mb-2">Subscribe To Our Newsletter</h2>
          <p className="text-sm mb-8 max-w-lg mx-auto">
            Get news and updates straight to your inbox as soon as they get published.
          </p>

          <form className="max-w-4xl mx-auto flex flex-col md:flex-row gap-0 rounded-md overflow-hidden shadow-lg">
            <input 
              type="text" 
              placeholder="Name" 
              className="flex-1 px-4 py-4 bg-white border-none focus:ring-0 text-sm outline-none"
            />
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              className="flex-1 px-4 py-4 bg-white border-l border-gray-200 focus:ring-0 text-sm outline-none"
            />
            <button 
              type="submit" 
              className="bg-black text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-gray-900 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Scroll to top fab - visible in image */}
      <button className="fixed bottom-8 right-8 text-gray-600 hover:text-black transition-colors">
        <ArrowUpCircle className="w-10 h-10" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default NewsletterDetail;