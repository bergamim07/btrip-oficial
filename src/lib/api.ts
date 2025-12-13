import { supabase, Destination, Itinerary } from './supabase'

// Destinations API
export const destinationsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('travelers_count', { ascending: false })
    
    if (error) throw error
    return data as Destination[]
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Destination
  },

  search: async (query: string) => {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .or(`name.ilike.%${query}%,country.ilike.%${query}%,description.ilike.%${query}%`)
    
    if (error) throw error
    return data as Destination[]
  }
}

// Itineraries API
export const itinerariesApi = {
  getAll: async (filters?: { isPublic?: boolean; userId?: string }) => {
    let query = supabase.from('itineraries').select('*')
    
    if (filters?.isPublic) {
      query = query.eq('is_public', true)
    }
    
    if (filters?.userId) {
      query = query.eq('user_id', filters.userId)
    }
    
    query = query.order('created_at', { ascending: false })
    
    const { data, error } = await query
    if (error) throw error
    return data as Itinerary[]
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Itinerary
  },

  create: async (itinerary: Partial<Itinerary>) => {
    const { data, error } = await supabase
      .from('itineraries')
      .insert(itinerary)
      .select()
      .single()
    
    if (error) throw error
    return data as Itinerary
  },

  update: async (id: string, updates: Partial<Itinerary>) => {
    const { data, error } = await supabase
      .from('itineraries')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Itinerary
  },

  incrementLikes: async (id: string) => {
    const { data, error } = await supabase.rpc('increment_likes', { itinerary_id: id })
    if (error) throw error
    return data
  },

  incrementSaves: async (id: string) => {
    const { data, error } = await supabase.rpc('increment_saves', { itinerary_id: id })
    if (error) throw error
    return data
  }
}

// Likes API
export const likesApi = {
  toggle: async (userId: string, itineraryId: string) => {
    // Check if like exists
    const { data: existing } = await supabase
      .from('itinerary_likes')
      .select('id')
      .eq('user_id', userId)
      .eq('itinerary_id', itineraryId)
      .single()

    if (existing) {
      // Unlike - we can't delete, so we'll just return
      return { liked: false }
    } else {
      // Like
      const { error } = await supabase
        .from('itinerary_likes')
        .insert({ user_id: userId, itinerary_id: itineraryId })
      
      if (error) throw error
      
      // Increment counter
      await supabase
        .from('itineraries')
        .update({ likes_count: supabase.raw('likes_count + 1') })
        .eq('id', itineraryId)
      
      return { liked: true }
    }
  }
}

// Saves API
export const savesApi = {
  toggle: async (userId: string, itineraryId: string) => {
    const { data: existing } = await supabase
      .from('itinerary_saves')
      .select('id')
      .eq('user_id', userId)
      .eq('itinerary_id', itineraryId)
      .single()

    if (existing) {
      return { saved: false }
    } else {
      const { error } = await supabase
        .from('itinerary_saves')
        .insert({ user_id: userId, itinerary_id: itineraryId })
      
      if (error) throw error
      
      await supabase
        .from('itineraries')
        .update({ saves_count: supabase.raw('saves_count + 1') })
        .eq('id', itineraryId)
      
      return { saved: true }
    }
  }
}

// Comments API
export const commentsApi = {
  getByItinerary: async (itineraryId: string) => {
    const { data, error } = await supabase
      .from('itinerary_comments')
      .select('*')
      .eq('itinerary_id', itineraryId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  create: async (userId: string, itineraryId: string, content: string) => {
    const { data, error } = await supabase
      .from('itinerary_comments')
      .insert({ user_id: userId, itinerary_id: itineraryId, content })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
