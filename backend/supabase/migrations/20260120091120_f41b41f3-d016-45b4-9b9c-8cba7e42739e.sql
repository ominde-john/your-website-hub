-- Create member_projects table for Projects section
CREATE TABLE public.member_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on_hold', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  start_date DATE,
  end_date DATE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create member_tasks table for Tasks section
CREATE TABLE public.member_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  project_id UUID REFERENCES public.member_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create member_calendar_events table for Calendar section
CREATE TABLE public.member_calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'meeting' CHECK (event_type IN ('meeting', 'deadline', 'reminder', 'event', 'task')),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  all_day BOOLEAN DEFAULT false,
  location TEXT,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create member_analytics table for tracking user activity
CREATE TABLE public.member_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.member_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for member_projects
CREATE POLICY "Users can view their own projects" ON public.member_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own projects" ON public.member_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON public.member_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own projects" ON public.member_projects FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for member_tasks
CREATE POLICY "Users can view their own tasks" ON public.member_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own tasks" ON public.member_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tasks" ON public.member_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tasks" ON public.member_tasks FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for member_calendar_events
CREATE POLICY "Users can view their own events" ON public.member_calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own events" ON public.member_calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own events" ON public.member_calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own events" ON public.member_calendar_events FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for member_analytics
CREATE POLICY "Users can view their own analytics" ON public.member_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own analytics" ON public.member_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_member_projects_updated_at BEFORE UPDATE ON public.member_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_member_tasks_updated_at BEFORE UPDATE ON public.member_tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_member_calendar_events_updated_at BEFORE UPDATE ON public.member_calendar_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for tasks and calendar events
ALTER PUBLICATION supabase_realtime ADD TABLE public.member_tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.member_calendar_events;