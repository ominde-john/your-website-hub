-- Add last_seen column to profiles table for tracking user activity
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create index for efficient last_seen queries
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON public.profiles(last_seen);
