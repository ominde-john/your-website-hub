-- Create subscribers table
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Public can subscribe (insert)
CREATE POLICY "Anyone can subscribe"
ON public.subscribers
FOR INSERT
WITH CHECK (true);

-- Only admins can view all subscribers
CREATE POLICY "Admins can view all subscribers"
ON public.subscribers
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update subscribers
CREATE POLICY "Admins can update subscribers"
ON public.subscribers
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete subscribers
CREATE POLICY "Admins can delete subscribers"
ON public.subscribers
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster email lookups
CREATE INDEX idx_subscribers_email ON public.subscribers(email);
CREATE INDEX idx_subscribers_active ON public.subscribers(is_active);