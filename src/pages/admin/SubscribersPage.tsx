import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Search, Users, Mail, UserX, UserCheck, ArrowLeft, Download } from "lucide-react";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  unsubscribed_at: string | null;
}

const SubscribersPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchSubscribers();
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    }
  };

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      
      setSubscribers(data || []);
    } catch (error: any) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriberStatus = async (subscriber: Subscriber) => {
    try {
      const newStatus = !subscriber.is_active;
      const { error } = await supabase
        .from("subscribers")
        .update({
          is_active: newStatus,
          unsubscribed_at: newStatus ? null : new Date().toISOString(),
        })
        .eq("id", subscriber.id);

      if (error) throw error;

      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === subscriber.id
            ? { ...s, is_active: newStatus, unsubscribed_at: newStatus ? null : new Date().toISOString() }
            : s
        )
      );

      toast.success(`Subscriber ${newStatus ? "activated" : "deactivated"}`);
    } catch (error: any) {
      console.error("Error updating subscriber:", error);
      toast.error("Failed to update subscriber status");
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const { error } = await supabase.from("subscribers").delete().eq("id", id);

      if (error) throw error;

      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Subscriber deleted");
    } catch (error: any) {
      console.error("Error deleting subscriber:", error);
      toast.error("Failed to delete subscriber");
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Email", "Subscribed At", "Status", "Unsubscribed At"].join(","),
      ...subscribers.map((s) =>
        [
          s.email,
          format(new Date(s.subscribed_at), "yyyy-MM-dd HH:mm"),
          s.is_active ? "Active" : "Inactive",
          s.unsubscribed_at ? format(new Date(s.unsubscribed_at), "yyyy-MM-dd HH:mm") : "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `subscribers_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = subscribers.filter((s) => s.is_active).length;
  const inactiveCount = subscribers.filter((s) => !s.is_active).length;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
            <p className="text-muted-foreground mt-1">
              Manage your newsletter subscriber list
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Subscribers</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                {subscribers.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2 text-green-600">
                <Mail className="h-6 w-6" />
                {activeCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Unsubscribed</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2 text-muted-foreground">
                <UserX className="h-6 w-6" />
                {inactiveCount}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? "No subscribers found matching your search" : "No subscribers yet"}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>
                        {format(new Date(subscriber.subscribed_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={subscriber.is_active ? "default" : "secondary"}>
                          {subscriber.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSubscriberStatus(subscriber)}
                        >
                          {subscriber.is_active ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteSubscriber(subscriber.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscribersPage;
