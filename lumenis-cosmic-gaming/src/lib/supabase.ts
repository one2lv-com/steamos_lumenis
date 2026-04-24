// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  username: string
  avatar_url?: string
  steam_id?: string
  discord_id?: string
  is_guest: boolean
  created_at: string
}

export interface PlayerStats {
  id: string
  user_id: string
  rank: number
  rating: number
  wins: number
  losses: number
  win_rate: number
  main_legend?: string
  favorite_weapons?: string[]
  playtime_hours: number
  updated_at: string
}

export interface CoachAnalysis {
  id: string
  user_id: string
  match_id?: string
  strengths: string[]
  improvements: string[]
  tips: string[]
  win_probability: number
  analysis_json: Record<string, unknown>
  timestamp: string
}

export interface LeaderboardEntry {
  rank: number
  username: string
  rating: number
  wins: number
  losses: number
  win_rate: number
  avatar_url?: string
}

// Helper functions
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}

export async function updatePlayerStats(stats: Partial<PlayerStats>): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('player_stats').upsert({
    user_id: user.id,
    ...stats,
    updated_at: new Date().toISOString()
  })
}

export async function getLeaderboard(limit = 100): Promise<LeaderboardEntry[]> {
  const { data } = await supabase
    .from('player_stats')
    .select(`
      *,
      users:user_id (
        username,
        avatar_url
      )
    `)
    .order('rating', { ascending: false })
    .limit(limit)

  return (data || []).map((entry: any, index: number) => ({
    rank: index + 1,
    username: entry.users?.username || 'Unknown',
    rating: entry.rating || 0,
    wins: entry.wins || 0,
    losses: entry.losses || 0,
    win_rate: entry.win_rate || 0,
    avatar_url: entry.users?.avatar_url
  }))
}

export async function saveCoachAnalysis(analysis: Omit<CoachAnalysis, 'id' | 'timestamp'>): Promise<void> {
  await supabase.from('coach_analysis').insert(analysis)
}
