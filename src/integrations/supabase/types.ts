export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agenda_items: {
        Row: {
          created_at: string
          display_order: number
          event_id: string
          id: string
          time: string
          title: string
        }
        Insert: {
          created_at?: string
          display_order: number
          event_id: string
          id?: string
          time: string
          title: string
        }
        Update: {
          created_at?: string
          display_order?: number
          event_id?: string
          id?: string
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "agenda_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          date: string
          description: string | null
          end_time: string
          id: string
          image_url: string | null
          location: string
          organizer_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          end_time: string
          id?: string
          image_url?: string | null
          location: string
          organizer_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          end_time?: string
          id?: string
          image_url?: string | null
          location?: string
          organizer_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_analytics: {
        Row: {
          average_time_on_page: number | null
          bounce_rate: number | null
          conversion_rate: number | null
          date: string
          form_submissions: number | null
          funnel_id: string
          id: string
          page_views: number | null
          unique_visitors: number | null
        }
        Insert: {
          average_time_on_page?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          date: string
          form_submissions?: number | null
          funnel_id: string
          id?: string
          page_views?: number | null
          unique_visitors?: number | null
        }
        Update: {
          average_time_on_page?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          date?: string
          form_submissions?: number | null
          funnel_id?: string
          id?: string
          page_views?: number | null
          unique_visitors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_analytics_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_deployments: {
        Row: {
          deployed_at: string
          deployed_by: string | null
          deployment_url: string | null
          error_message: string | null
          funnel_id: string
          id: string
          status: string
          version_id: string | null
        }
        Insert: {
          deployed_at?: string
          deployed_by?: string | null
          deployment_url?: string | null
          error_message?: string | null
          funnel_id: string
          id?: string
          status: string
          version_id?: string | null
        }
        Update: {
          deployed_at?: string
          deployed_by?: string | null
          deployment_url?: string | null
          error_message?: string | null
          funnel_id?: string
          id?: string
          status?: string
          version_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_deployments_deployed_by_fkey"
            columns: ["deployed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_deployments_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_deployments_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "funnel_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_versions: {
        Row: {
          created_at: string
          created_by: string | null
          elements: Json
          funnel_id: string
          id: string
          settings: Json
          version_number: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          elements: Json
          funnel_id: string
          id?: string
          settings: Json
          version_number: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          elements?: Json
          funnel_id?: string
          id?: string
          settings?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "funnel_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_versions_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_visitors: {
        Row: {
          browser: string | null
          conversion_date: string | null
          converted: boolean | null
          country: string | null
          device: string | null
          first_visit: string
          funnel_id: string
          id: string
          last_visit: string
          referrer: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visit_count: number | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          conversion_date?: string | null
          converted?: boolean | null
          country?: string | null
          device?: string | null
          first_visit?: string
          funnel_id: string
          id?: string
          last_visit?: string
          referrer?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visit_count?: number | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          conversion_date?: string | null
          converted?: boolean | null
          country?: string | null
          device?: string | null
          first_visit?: string
          funnel_id?: string
          id?: string
          last_visit?: string
          referrer?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visit_count?: number | null
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funnel_visitors_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnels: {
        Row: {
          created_at: string
          elements: Json
          id: string
          is_published: boolean | null
          name: string
          published_at: string | null
          settings: Json
          slug: string
          stats: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          elements?: Json
          id?: string
          is_published?: boolean | null
          name: string
          published_at?: string | null
          settings?: Json
          slug: string
          stats?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          elements?: Json
          id?: string
          is_published?: boolean | null
          name?: string
          published_at?: string | null
          settings?: Json
          slug?: string
          stats?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funnels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          event_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
