import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';
import { ArrowLeft, Camera, Search, Users, Trophy, Zap, Music, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const questTypes = [
  { key: 'vibes', label: 'Vibes', icon: Music, desc: 'Pure fun & culture' },
  { key: 'photo', label: 'Photo', icon: Camera, desc: 'Capture the moment' },
  { key: 'find_it', label: 'Find It', icon: Search, desc: 'Track something down' },
  { key: 'skill', label: 'Skill', icon: Zap, desc: 'Show your talents' },
  { key: 'social', label: 'Social', icon: Users, desc: 'Show up & connect' },
  { key: 'open_challenge', label: 'Challenge', icon: Trophy, desc: 'Community decides' },
];

const difficulties = [
  { key: 'easy', label: 'Easy', xp: 100, desc: 'Quick & simple' },
  { key: 'medium', label: 'Medium', xp: 250, desc: 'Takes some effort' },
  { key: 'hard', label: 'Hard', xp: 500, desc: 'Real commitment' },
  { key: 'legendary', label: 'Legendary', xp: 1000, desc: 'Only for the bold' },
];

const difficultyColors = {
  easy: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  medium: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  hard: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  legendary: 'text-primary border-primary/30 bg-primary/10',
};

export default function PostQuest() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posting, setPosting] = useState(false);
  const [form, setForm] = useState({
    quest_type: '',
    difficulty: 'easy',
    title: '',
    description: '',
    location: '',
    rules: '',
    community_votes_enabled: false,
    expires_hours: '24',
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const selectedDifficulty = difficulties.find(d => d.key === form.difficulty);

  const handlePost = async () => {
  if (!form.quest_type || !form.title || !form.location) {
    toast({ title: 'Fill in all required fields', variant: 'destructive' });
    return;
  }
  setPosting(true);
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const expiresAt = new Date(Date.now() + parseInt(form.expires_hours) * 60 * 60 * 1000).toISOString();
    
    const { error } = await supabase
      .from('quests')
      .insert({
        ...form,
        xp_reward: selectedDifficulty?.xp || 100,
        bonus_xp: form.community_votes_enabled ? 50 : 0,
        expires_at: expiresAt,
        status: 'open',
        created_by_id: user.id,
        poster_username: user.email,
        poster_level: 1,
        accepted_count: 0,
      });

    if (error) throw error;
    toast({ title: '⚡ Quest posted!', description: 'Other questers can now find and accept it.' });
    navigate('/');
  } catch (e) {
    toast({ title: 'Could not post quest', variant: 'destructive' });
  }
  setPosting(false);
};

  return (
    <div className="px-4 pt-4 pb-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <h1 className="font-heading font-bold text-2xl text-foreground mb-1">Post a Quest</h1>
      <p className="text-sm text-muted-foreground mb-6">Create a challenge. Others earn XP completing it 🎯</p>

      {/* Quest Type */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Quest Type *</label>
        <div className="grid grid-cols-3 gap-2">
          {questTypes.map((t) => {
            const Icon = t.icon;
            const selected = form.quest_type === t.key;
            return (
              <button
                key={t.key}
                onClick={() => update('quest_type', t.key)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                  selected ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-secondary/50 border-border text-muted-foreground hover:border-primary/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Difficulty & XP Reward *</label>
        <div className="grid grid-cols-2 gap-2">
          {difficulties.map((d) => {
            const selected = form.difficulty === d.key;
            return (
              <button
                key={d.key}
                onClick={() => update('difficulty', d.key)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  selected ? `${difficultyColors[d.key]} border-current` : 'bg-secondary/50 border-border text-muted-foreground hover:border-primary/20'
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-semibold">{d.label}</p>
                  <p className="text-xs opacity-70">{d.desc}</p>
                </div>
                <span className={`text-sm font-heading font-bold ${selected ? '' : 'text-muted-foreground'}`}>
                  {d.xp} XP
                </span>
              </button>
            );
          })}
        </div>
        {selectedDifficulty && (
          <p className="text-xs text-primary mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Questers will earn {selectedDifficulty.xp} XP for completing this
          </p>
        )}
      </div>

      {/* Title */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Quest Title *</label>
        <input
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. Who can fly a kite the highest on Emancipation Park?"
          className="w-full px-4 py-3 bg-secondary/60 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40"
        />
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="What are you looking for? Set the scene..."
          rows={3}
          className="w-full px-4 py-3 bg-secondary/60 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 resize-none"
        />
      </div>

      {/* Location */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Location *</label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="e.g. Emancipation Park, Hope Gardens, Hellshire Beach"
            className="w-full pl-10 pr-4 py-3 bg-secondary/60 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40"
          />
        </div>
      </div>

      {/* Rules */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Rules</label>
        <textarea
          value={form.rules}
          onChange={(e) => update('rules', e.target.value)}
          placeholder="Any rules for completing this quest..."
          rows={2}
          className="w-full px-4 py-3 bg-secondary/60 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 resize-none"
        />
      </div>

      {/* Expiry */}
      <div className="mb-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Quest Duration</label>
        <select
          value={form.expires_hours}
          onChange={(e) => update('expires_hours', e.target.value)}
          className="w-full px-4 py-3 bg-secondary/60 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary/40"
        >
          <option value="1">1 hour</option>
          <option value="3">3 hours</option>
          <option value="6">6 hours</option>
          <option value="12">12 hours</option>
          <option value="24">24 hours</option>
          <option value="48">48 hours</option>
          <option value="168">1 week</option>
        </select>
      </div>

      {/* Community Vote toggle */}
      <button
        onClick={() => update('community_votes_enabled', !form.community_votes_enabled)}
        className={`w-full flex items-center gap-3 p-4 rounded-xl border mb-8 transition-all ${
          form.community_votes_enabled ? 'bg-amber-500/10 border-amber-500/30' : 'bg-secondary/50 border-border hover:border-primary/20'
        }`}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${form.community_votes_enabled ? 'bg-amber-500/20' : 'bg-secondary'}`}>
          👥
        </div>
        <div className="flex-1 text-left">
          <p className={`text-sm font-semibold ${form.community_votes_enabled ? 'text-amber-400' : 'text-foreground'}`}>Community Voting</p>
          <p className="text-xs text-muted-foreground">Let everyone vote on the best submission · +50 bonus XP</p>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          form.community_votes_enabled ? 'border-amber-400 bg-amber-400' : 'border-muted-foreground'
        }`}>
          {form.community_votes_enabled && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
        </div>
      </button>

      <Button
        onClick={handlePost}
        disabled={posting}
        className="w-full h-14 rounded-2xl font-heading font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground glow-gold"
      >
        {posting ? (
          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Post Quest
          </span>
        )}
      </Button>
    </div>
  );
}
