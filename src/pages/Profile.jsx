import React, { useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { LogOut, ChevronRight, Flame, Edit2, Shield, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/quest/StatsCard';
import BadgeChip from '@/components/quest/BadgeChip';
import LevelBadge, { getLevelInfo, getXpForLevel } from '@/components/quest/LevelBadge';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data: profiles } = await supabase
      .from('quester_profiles')
      .select('*')
      .eq('created_by_id', user.id)
      .limit(1);

    if (profiles && profiles.length > 0) setProfile(profiles[0]);
  } catch (e) { console.error(e); }
  setLoading(false);
};

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const displayName = profile?.display_name || user?.full_name || 'New Quester';
  const username = profile?.username || user?.email?.split('@')[0] || 'quester';
  const level = profile?.level || 1;
  const xp = profile?.xp || 0;
  const nextLevelXp = getXpForLevel(level);
  const xpProgress = Math.min((xp / nextLevelXp) * 100, 100);
  const levelInfo = getLevelInfo(level);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading font-bold text-xl text-foreground">Profile</h1>
       <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-4xl font-heading font-bold text-foreground border-2 border-primary/30">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Edit2 className="w-4 h-4 text-primary-foreground" />
          </button>
          <div className={`absolute -top-1.5 -left-1.5 w-9 h-9 rounded-full flex items-center justify-center border-2 border-background font-heading font-bold text-sm ${levelInfo.bg} ${levelInfo.color}`}>
            {level}
          </div>
        </div>

        <h2 className="font-heading font-bold text-xl text-foreground">{displayName}</h2>
        <p className="text-sm text-primary mt-0.5">@{username}</p>
        <div className="mt-2">
          <LevelBadge level={level} />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{profile?.parish || 'Kingston'}</p>

        {/* XP Progress */}
        <div className="w-full max-w-xs mt-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">{xp.toLocaleString()} XP</span>
            <span className="text-muted-foreground">→ Level {level + 1} at {nextLevelXp.toLocaleString()} XP</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
          <p className="text-xs text-center text-muted-foreground mt-1.5">{nextLevelXp - xp} XP to next level</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <StatsCard label="Quests Done" value={profile?.quests_completed || 0} />
        <StatsCard label="Total XP" value={(profile?.total_xp_earned || 0).toLocaleString()} />
        <StatsCard label="Rating" value={profile?.rating?.toFixed(1) || '5.0'} />
      </div>

      {/* Streak */}
      {(profile?.streak_days || 0) > 0 && (
        <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl mb-6">
          <Flame className="w-5 h-5 text-orange-400" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{profile.streak_days} day streak 🔥</p>
            <p className="text-xs text-muted-foreground">Keep completing quests daily to maintain it</p>
          </div>
        </div>
      )}

      {/* Completion Rate */}
      <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-6">
        <Shield className="w-5 h-5 text-emerald-400" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{profile?.completion_rate || 100}% Completion Rate</p>
          <p className="text-xs text-muted-foreground">High rate unlocks legendary quests</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Badges</h3>
        </div>
        {profile?.badges && profile.badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((badge, i) => <BadgeChip key={i} badge={badge} />)}
          </div>
        ) : (
          <div className="p-4 bg-secondary/50 rounded-xl border border-border border-dashed text-center">
            <p className="text-sm text-muted-foreground">Complete quests to earn badges! 🏆</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
