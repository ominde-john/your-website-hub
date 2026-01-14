-- Add RLS policy to allow users to delete their own messages
CREATE POLICY "Message senders can delete their messages"
ON public.topic_messages
FOR DELETE
USING (auth.uid() = sender_id);
