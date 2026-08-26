-- Create video call signals table for WebRTC signaling
CREATE TABLE public.video_call_signals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  caller_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  signal_type TEXT NOT NULL,
  signal_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_call_signals ENABLE ROW LEVEL SECURITY;

-- Policies for video call signals
CREATE POLICY "Users can view signals involving them"
ON public.video_call_signals
FOR SELECT
USING (auth.uid() = caller_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can insert signals as caller"
ON public.video_call_signals
FOR INSERT
WITH CHECK (auth.uid() = caller_id);

CREATE POLICY "Users can delete their signals"
ON public.video_call_signals
FOR DELETE
USING (auth.uid() = caller_id OR auth.uid() = receiver_id);

-- Enable realtime for video call signals
ALTER PUBLICATION supabase_realtime ADD TABLE public.video_call_signals;