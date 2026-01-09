-- Create discussion topics table
CREATE TABLE public.discussion_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create topic messages table (group chat messages)
CREATE TABLE public.topic_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID NOT NULL REFERENCES public.discussion_topics(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.discussion_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for discussion_topics
CREATE POLICY "Anyone can view topics"
ON public.discussion_topics
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create topics"
ON public.discussion_topics
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Topic creators can update their topics"
ON public.discussion_topics
FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Topic creators can delete their topics"
ON public.discussion_topics
FOR DELETE
USING (auth.uid() = created_by);

-- RLS policies for topic_messages
CREATE POLICY "Anyone can view topic messages"
ON public.topic_messages
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can send messages to topics"
ON public.topic_messages
FOR INSERT
WITH CHECK (auth.uid() = sender_id);

-- Enable realtime for topic messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.topic_messages;

-- Create trigger for automatic timestamp updates on topics
CREATE TRIGGER update_discussion_topics_updated_at
BEFORE UPDATE ON public.discussion_topics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();