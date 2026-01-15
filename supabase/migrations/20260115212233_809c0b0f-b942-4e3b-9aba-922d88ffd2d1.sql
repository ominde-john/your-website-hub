-- Add verification and label columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS member_label text DEFAULT NULL;

-- Create RLS policy for admins to update verification and labels
CREATE POLICY "Admins can update member verification and labels" 
ON public.profiles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Insert admin role for the specified user (your account)
INSERT INTO public.user_roles (user_id, role) 
VALUES ('6fac4cb2-b98b-46c4-bead-ef7d15d81fce', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;