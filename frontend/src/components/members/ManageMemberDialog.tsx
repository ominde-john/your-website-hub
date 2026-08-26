import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BadgeCheck, Loader2 } from "lucide-react";

const MEMBER_LABELS = [
  { value: "none", label: "No Label" },
  { value: "Developer", label: "Developer" },
  { value: "Community Manager", label: "Community Manager" },
  { value: "Member", label: "Member" },
  { value: "Events Organizer", label: "Events Organizer" },
  { value: "Executive Admin", label: "Executive Admin" },
];

interface ManageMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    is_verified?: boolean;
    member_label?: string | null;
  } | null;
  onSuccess: () => void;
}

const ManageMemberDialog = ({ open, onOpenChange, member, onSuccess }: ManageMemberDialogProps) => {
  const [isVerified, setIsVerified] = useState(member?.is_verified || false);
  const [memberLabel, setMemberLabel] = useState(member?.member_label || "none");
  const [isLoading, setIsLoading] = useState(false);

  // Update state when member changes
  useState(() => {
    if (member) {
      setIsVerified(member.is_verified || false);
      setMemberLabel(member.member_label || "none");
    }
  });

  const handleSave = async () => {
    if (!member) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_verified: isVerified,
          member_label: memberLabel === "none" ? null : memberLabel,
        })
        .eq('id', member.id);

      if (error) throw error;

      toast.success("Member updated successfully");
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update member");
    } finally {
      setIsLoading(false);
    }
  };

  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Member</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{member.first_name} {member.last_name}</p>
              <p className="text-sm text-muted-foreground">@{member.username}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#1D9BF0]" />
                <Label htmlFor="verified">Verification Badge</Label>
              </div>
              <Switch
                id="verified"
                checked={isVerified}
                onCheckedChange={setIsVerified}
              />
            </div>

            <div className="space-y-2">
              <Label>Member Label</Label>
              <Select value={memberLabel} onValueChange={setMemberLabel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a label" />
                </SelectTrigger>
                <SelectContent>
                  {MEMBER_LABELS.map((label) => (
                    <SelectItem key={label.value} value={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMemberDialog;
