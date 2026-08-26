-- =====================================================
-- INITIAL DATABASE SETUP FOR TEKSOFT WEBSITE
-- This migration creates all necessary tables, functions,
-- triggers, and policies for user registration with
-- email verification codes
-- =====================================================

-- =====================================================
-- 1. EMAIL VERIFICATION CODES TABLE
-- Used for storing verification codes during registration
-- and password reset flows
-- =====================================================

CREATE TABLE public.email_verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on email_verification_codes
ALTER TABLE public.email_verification_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert verification codes (for registration)
CREATE POLICY "Anyone can insert verification codes"
ON public.email_verification_codes
FOR INSERT
WITH CHECK (true);

-- Allow reading codes for verification
CREATE POLICY "Anyone can read verification codes"
ON public.email_verification_codes
FOR SELECT
USING (true);

-- Allow updating codes (marking as used)
CREATE POLICY "Anyone can update verification codes"
ON public.email_verification_codes
FOR UPDATE
USING (true);

-- Create indexes for faster lookups
CREATE INDEX idx_verification_codes_email ON public.email_verification_codes(email);
CREATE INDEX idx_verification_codes_expires ON public.email_verification_codes(expires_at);

-- =====================================================
-- 2. PROFILES TABLE
-- Stores user profile information linked to auth.users
-- =====================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Additional policy: Allow anyone to read profiles by username or email (for login)
CREATE POLICY "Anyone can read profiles by email"
ON public.profiles
FOR SELECT
USING (true);

-- =====================================================
-- 3. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to handle new user profile creation
-- This runs automatically when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, username, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'first_name',
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      ''
    ),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
    COALESCE(
      NEW.raw_user_meta_data ->> 'username',
      LOWER(REPLACE(COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', SPLIT_PART(NEW.email, '@', 1)), ' ', '_'))
    ),
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data ->> 'avatar_url',
      NEW.raw_user_meta_data ->> 'picture',
      NULL
    )
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 4. STORAGE BUCKET FOR AVATARS
-- =====================================================

INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);

-- Storage policies for avatar uploads
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
