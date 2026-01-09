-- Add last_seen column to profiles table for tracking user activity
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create index for efficient last_seen queries
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON public.profiles(last_seen);

-- Function to update last_seen timestamp
CREATE OR REPLACE FUNCTION public.update_last_seen()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET last_seen = now()
  WHERE user_id = auth.uid();
  RETURN NEW;
END;
$$;
