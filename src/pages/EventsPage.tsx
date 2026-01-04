import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SectionTitle from "../components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Users } from "lucide-react";

const EventsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Tech Summit 2026",
      description: "A powerful multi-day summit bringing together developers, founders, designers, and IT experts across Africa.",
      date: "July 11–13, 2026",
      location: "Nairobi International Convention Centre",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      attendees: 60,
      category: "Conference",
    },
    {
      id: 2,
      title: "Modern Frontend Bootcamp 2026",
      description: "A practical bootcamp covering React, Tailwind CSS, and performance-first UI engineering.",
      date: "March 19, 2026",
      location: "Virtual Event",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
      attendees: 50,
      category: "Workshop",
    },
    {
      id: 3,
      title: "AI, Robotics & Automation Meetup 2026",
      description: "A meetup exploring automation trends, robotics programming, and ethical AI.",
      date: "April 5, 2026",
      location: "Tech Hub Nairobi",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      attendees: 35,
      category: "Meetup",
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Web Development Workshop",
      description: "Hands-on workshop covering modern web development practices.",
      date: "December 15, 2024",
      location: "Nairobi Tech Hub",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      attendees: 45,
      category: "Workshop",
    },
    {
      id: 5,
      title: "Cloud Computing Seminar",
      description: "Learn about AWS, Azure, and Google Cloud platforms.",
      date: "November 20, 2024",
      location: "Virtual Event",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      attendees: 80,
      category: "Seminar",
    },
  ];

  const EventCard = ({ event, isPast = false }: { event: typeof upcomingEvents[0]; isPast?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-techblue text-white text-xs px-3 py-1 rounded-full">
          {event.category}
        </div>
        {isPast && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Completed</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-techblue" />
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-techblue" />
            {event.location}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-techblue" />
            {event.attendees} attendees
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className={isPast ? "bg-gray-400" : "bg-techblue hover:bg-techblue-dark"} disabled={isPast}>
          {isPast ? "Event Ended" : "Register Now"}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div>
      <PageHeader
        title="Events & Meetups"
        description="Join our workshops, hackathons, and networking events"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events List */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-6">
                  <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="past">Past Events</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="past">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} isPast />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Calendar Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Event Calendar</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <div className="mt-6">
                  <h4 className="font-semibold mb-2 text-gray-900">Want to host an event?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Share your knowledge with the community by hosting a workshop or meetup.
                  </p>
                  <Button variant="outline" className="w-full border-techblue text-techblue hover:bg-techblue hover:text-white">
                    Submit Event Proposal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
