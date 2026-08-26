import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, ShoppingCart } from "lucide-react";

interface AuthRequiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthRequiredDialog = ({ isOpen, onClose }: AuthRequiredDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-techblue/10">
            <ShoppingCart className="h-6 w-6 text-techblue" />
          </div>
          <DialogTitle className="text-center text-gray-900 dark:text-white">
            Sign in Required
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
            Please sign in or create an account to add items to your cart and
            enjoy a seamless shopping experience.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button
            asChild
            className="w-full bg-techblue hover:bg-techblue-dark text-white"
            onClick={onClose}
          >
            <Link to="/auth">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-600"
            onClick={onClose}
          >
            <Link to="/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
