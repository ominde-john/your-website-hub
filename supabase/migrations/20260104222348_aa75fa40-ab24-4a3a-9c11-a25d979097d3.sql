-- Create table to store email verification codes
CREATE TABLE public.email_verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_verification_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for registration)
CREATE POLICY "Anyone can insert verification codes"
ON public.email_verification_codes
FOR INSERT
WITH CHECK (true);

-- Allow reading codes for verification (checking by email and code)
CREATE POLICY "Anyone can read verification codes"
ON public.email_verification_codes
FOR SELECT
USING (true);

-- Allow updating codes (marking as used)
CREATE POLICY "Anyone can update verification codes"
ON public.email_verification_codes
FOR UPDATE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_verification_codes_email ON public.email_verification_codes(email);
CREATE INDEX idx_verification_codes_expires ON public.email_verification_codes(expires_at);