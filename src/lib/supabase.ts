import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quiz_responses: {
        Row: {
          id: string
          user_id: string | null
          sleep_hours: number | null
          exercise_frequency: string | null
          stress_level: number | null
          study_hours: number | null
          financial_control: string | null
          self_care_routine: string | null
          improvement_plan: any | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          sleep_hours?: number | null
          exercise_frequency?: string | null
          stress_level?: number | null
          study_hours?: number | null
          financial_control?: string | null
          self_care_routine?: string | null
          improvement_plan?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          sleep_hours?: number | null
          exercise_frequency?: string | null
          stress_level?: number | null
          study_hours?: number | null
          financial_control?: string | null
          self_care_routine?: string | null
          improvement_plan?: any | null
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string | null
          texto: string
          concluida: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          texto: string
          concluida?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          texto?: string
          concluida?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string | null
          nome: string
          dias: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          nome: string
          dias?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          nome?: string
          dias?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
