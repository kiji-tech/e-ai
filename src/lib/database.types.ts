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
      corrections: {
        Row: {
          comment_en: string | null
          comment_ja: string | null
          created_at: string
          delete_flag: boolean | null
          en: string | null
          ja: string | null
          points: string | null
          result_en: string | null
          result_ja: string | null
          score: number | null
          target_date: string | null
          uid: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment_en?: string | null
          comment_ja?: string | null
          created_at?: string
          delete_flag?: boolean | null
          en?: string | null
          ja?: string | null
          points?: string | null
          result_en?: string | null
          result_ja?: string | null
          score?: number | null
          target_date?: string | null
          uid?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment_en?: string | null
          comment_ja?: string | null
          created_at?: string
          delete_flag?: boolean | null
          en?: string | null
          ja?: string | null
          points?: string | null
          result_en?: string | null
          result_ja?: string | null
          score?: number | null
          target_date?: string | null
          uid?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "corrections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uid"]
          },
        ]
      }
      diaries: {
        Row: {
          created_at: string
          delete_flag: boolean | null
          en: string | null
          ja: string | null
          target_date: string | null
          uid: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          delete_flag?: boolean | null
          en?: string | null
          ja?: string | null
          target_date?: string | null
          uid?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          delete_flag?: boolean | null
          en?: string | null
          ja?: string | null
          target_date?: string | null
          uid?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dialies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uid"]
          },
        ]
      }
      subscription_items: {
        Row: {
          created_at: string
          end_at: string | null
          price_id: string | null
          quantity: number | null
          subscription_id: string | null
          uid: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          end_at?: string | null
          price_id?: string | null
          quantity?: number | null
          subscription_id?: string | null
          uid: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          end_at?: string | null
          price_id?: string | null
          quantity?: number | null
          subscription_id?: string | null
          uid?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_items_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["uid"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          canceled: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          quantity: number | null
          status: string | null
          uid: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cancel_at?: string | null
          canceled?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          quantity?: number | null
          status?: string | null
          uid: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cancel_at?: string | null
          canceled?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          quantity?: number | null
          status?: string | null
          uid?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uid"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          delete_flag: boolean | null
          email: string
          member_ship: Database["public"]["Enums"]["MemberShip"] | null
          name: string | null
          role: Database["public"]["Enums"]["Role"] | null
          stripe_id: string
          uid: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          delete_flag?: boolean | null
          email: string
          member_ship?: Database["public"]["Enums"]["MemberShip"] | null
          name?: string | null
          role?: Database["public"]["Enums"]["Role"] | null
          stripe_id: string
          uid?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          delete_flag?: boolean | null
          email?: string
          member_ship?: Database["public"]["Enums"]["MemberShip"] | null
          name?: string | null
          role?: Database["public"]["Enums"]["Role"] | null
          stripe_id?: string
          uid?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      word: {
        Row: {
          created_at: string
          delete_flag: boolean | null
          mean: string | null
          target_date: string | null
          uid: string
          updated_at: string | null
          user_id: string | null
          word: string | null
        }
        Insert: {
          created_at?: string
          delete_flag?: boolean | null
          mean?: string | null
          target_date?: string | null
          uid?: string
          updated_at?: string | null
          user_id?: string | null
          word?: string | null
        }
        Update: {
          created_at?: string
          delete_flag?: boolean | null
          mean?: string | null
          target_date?: string | null
          uid?: string
          updated_at?: string | null
          user_id?: string | null
          word?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "word_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["uid"]
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
      MemberShip: "Free" | "Prime"
      Role: "User" | "Admin"
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

