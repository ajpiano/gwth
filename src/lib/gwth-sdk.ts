import type { SupabaseClient } from '@supabase/supabase-js'
import type { User } from './types/user'

export class GwthSDK {
  private supabase: SupabaseClient

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }

  async registerDiscordUser(discordId: string, username: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .insert({ discord_id: discordId, username: username })
      .select()
      .single()

    if (error) {
      console.error('Error registering user:', error)
      return null
    }

    return data as User
  }

  async authenticateDiscordUser(discordId: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select()
      .eq('discord_id', discordId)
      .single()

    if (error) {
      console.error('Error authenticating user:', error)
      return null
    }

    return data as User
  }
}