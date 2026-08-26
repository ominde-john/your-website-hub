-- Add last_seen column to profiles if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP WITH TIME ZONE;

-- Create message_requests table for chat request acceptance
CREATE TABLE public.message_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (sender_id, receiver_id)
);

-- Enable RLS on message_requests
ALTER TABLE public.message_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for message_requests
CREATE POLICY "Users can view their own requests"
ON public.message_requests
FOR SELECT
TO authenticated
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send message requests"
ON public.message_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Receivers can update request status"
ON public.message_requests
FOR UPDATE
TO authenticated
USING (auth.uid() = receiver_id);

-- Enable realtime for message_requests
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_requests;