export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      discussion_topics: {
        Row: {
          category: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_verification_codes: {
        Row: {
          code: string
          created_at: string
          email: string
          expires_at: string
          id: string
          used: boolean
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          used?: boolean
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          used?: boolean
        }
        Relationships: []
      }
      member_analytics: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      member_calendar_events: {
        Row: {
          all_day: boolean | null
          color: string | null
          created_at: string
          description: string | null
          end_time: string | null
          event_type: string
          id: string
          location: string | null
          start_time: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_type?: string
          id?: string
          location?: string | null
          start_time: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          all_day?: boolean | null
          color?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_type?: string
          id?: string
          location?: string | null
          start_time?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      member_projects: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          priority: string
          progress: number | null
          start_date: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string
          progress?: number | null
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          priority?: string
          progress?: number | null
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      member_tasks: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string
          project_id: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          project_id?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string
          project_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "member_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      message_requests: {
        Row: {
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string
          metadata: Json | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          availability_status: string | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string
          github_url: string | null
          headline: string | null
          id: string
          interests: string[] | null
          is_verified: boolean | null
          job_title: string | null
          languages: string[] | null
          last_name: string
          last_seen: string | null
          linkedin_url: string | null
          location: string | null
          member_label: string | null
          phone_number: string | null
          pronouns: string | null
          skills: string[] | null
          timezone: string | null
          twitter_url: string | null
          updated_at: string
          user_id: string
          username: string
          website: string | null
        }
        Insert: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name: string
          github_url?: string | null
          headline?: string | null
          id?: string
          interests?: string[] | null
          is_verified?: boolean | null
          job_title?: string | null
          languages?: string[] | null
          last_name: string
          last_seen?: string | null
          linkedin_url?: string | null
          location?: string | null
          member_label?: string | null
          phone_number?: string | null
          pronouns?: string | null
          skills?: string[] | null
          timezone?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id: string
          username: string
          website?: string | null
        }
        Update: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string
          github_url?: string | null
          headline?: string | null
          id?: string
          interests?: string[] | null
          is_verified?: boolean | null
          job_title?: string | null
          languages?: string[] | null
          last_name?: string
          last_seen?: string | null
          linkedin_url?: string | null
          location?: string | null
          member_label?: string | null
          phone_number?: string | null
          pronouns?: string | null
          skills?: string[] | null
          timezone?: string | null
          twitter_url?: string | null
          updated_at?: string
          user_id?: string
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      topic_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          sender_id: string
          topic_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          sender_id: string
          topic_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          sender_id?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_messages_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "discussion_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          calendar_reminders: boolean | null
          created_at: string
          email_notifications: boolean | null
          id: string
          language: string | null
          marketing_emails: boolean | null
          message_notifications: boolean | null
          profile_visibility: string | null
          push_notifications: boolean | null
          session_timeout: number | null
          show_online_status: boolean | null
          show_read_receipts: boolean | null
          show_typing_indicator: boolean | null
          sms_notifications: boolean | null
          task_reminders: boolean | null
          theme: string | null
          two_factor_enabled: boolean | null
          updated_at: string
          user_id: string
          weekly_digest: boolean | null
        }
        Insert: {
          calendar_reminders?: boolean | null
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          marketing_emails?: boolean | null
          message_notifications?: boolean | null
          profile_visibility?: string | null
          push_notifications?: boolean | null
          session_timeout?: number | null
          show_online_status?: boolean | null
          show_read_receipts?: boolean | null
          show_typing_indicator?: boolean | null
          sms_notifications?: boolean | null
          task_reminders?: boolean | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id: string
          weekly_digest?: boolean | null
        }
        Update: {
          calendar_reminders?: boolean | null
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          marketing_emails?: boolean | null
          message_notifications?: boolean | null
          profile_visibility?: string | null
          push_notifications?: boolean | null
          session_timeout?: number | null
          show_online_status?: boolean | null
          show_read_receipts?: boolean | null
          show_typing_indicator?: boolean | null
          sms_notifications?: boolean | null
          task_reminders?: boolean | null
          theme?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id?: string
          weekly_digest?: boolean | null
        }
        Relationships: []
      }
      video_call_signals: {
        Row: {
          caller_id: string
          created_at: string
          id: string
          receiver_id: string
          signal_data: Json
          signal_type: string
        }
        Insert: {
          caller_id: string
          created_at?: string
          id?: string
          receiver_id: string
          signal_data: Json
          signal_type: string
        }
        Update: {
          caller_id?: string
          created_at?: string
          id?: string
          receiver_id?: string
          signal_data?: Json
          signal_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
