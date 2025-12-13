import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  travel_preferences: string[]
  created_at: string
  updated_at: string
}

export type Destination = {
  id: string
  name: string
  country: string
  region: string | null
  description: string | null
  image_url: string | null
  ideal_duration: string | null
  cost_range: string | null
  tags: string[]
  rating: number
  travelers_count: number
  created_at: string
  updated_at: string
}

export type Itinerary = {
  id: string
  user_id: string | null
  title: string
  destination: string
  destination_id: string | null
  duration: string
  budget: string | null
  description: string | null
  trip_type: string | null
  traveler_profile: string | null
  start_date: string | null
  end_date: string | null
  is_public: boolean
  tags: string[]
  likes_count: number
  saves_count: number
  views_count: number
  created_at: string
  updated_at: string
}

export type ItineraryDay = {
  id: string
  itinerary_id: string
  day_number: number
  title: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export type DayActivity = {
  id: string
  day_id: string
  period: 'morning' | 'afternoon' | 'evening' | 'night'
  activity_type: 'tourist_spot' | 'restaurant' | 'experience' | 'activity' | 'transport'
  title: string
  description: string | null
  location: string | null
  estimated_duration: string | null
  estimated_cost: string | null
  order_index: number
  created_at: string
  updated_at: string
}
