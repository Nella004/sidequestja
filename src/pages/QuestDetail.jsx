import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';
import { ArrowLeft, MapPin, Clock, Users, Shield, Share2, Flag, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import QuestTypeBadge from '@/components/quest/QuestTypeBadge';
import DifficultyBadge from '@/components/quest/DifficultyBadge';
import XPPill from '@/components/quest/XPPill';
import { getLevelInfo } from '@/components/quest/LevelBadge';
import moment from 'moment';

export default function QuestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => { loadQuest(); }, [id]);

  const loadQuest = async () => {
  try {
    const { data, error } = await supabase
      .from('quests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    setQuest(data);
  } catch (e) { console.error(e); }
  setLoading(false);
};

  const handleAccept = async () => {
  setAccepting(true);
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { error: subError } = await supabase
      .from('quest_submissions')
      .insert({ 
        quest_id: quest.id, 
        status: 'accepted',
        created_by_id: user.id
      });

    if (subError) throw subError;

    const { error: questError } = await supabase
      .from('quests')
      .update({ accepted_count: (quest.accepted_count || 0) + 1 })
      .eq('id', quest.id);

    if (questError) throw questError;

    toast({ title: '🎯 Quest accepted!', description: 'Check My Quests to track your progress.' });
    navigate('/my-quests');
  } catch (e) {
    toast({ title: 'Could not accept quest', variant: 'destructive' });
  }
  setAccepting(false);
};

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!quest) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-2">
      <p className="text-muted-foreground">Quest not found</p>
      <button onClick={() => navigate('/')} className="text-primary text-sm">Back to feed</button>
    </div>
  );

  const timeLeft = quest.expires_at ? moment(quest.expires_at).fromNow() : null;
  const posterLevelInfo = getLevelInfo(quest.poster_level || 1);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pt-4 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary border border-border hover:border-primary/30 transition-colors">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary border border-border hover:border-destructive/30 transition-colors">
            <Flag className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Type + Location */}
      <div className="flex items-center flex-wrap gap-2 mb-4">
        <QuestTypeBadge type={quest.quest_type} size="lg" />
        <DifficultyBadge difficulty={quest.difficulty} />
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {quest.location}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-heading font-bold text-2xl text-foreground leading-tight mb-6">{quest.title}</h1>

      {/* XP Reward Card */}
      <div className="flex items-center gap-4 p-5 bg-primary/10 border border-primary/25 rounded-2xl mb-5 glow-gold">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-3xl">⚡</div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Complete this quest and earn</p>
          <p className="font-heading font-bold text-3xl text-primary">{quest.xp_reward} XP</p>
          {quest.bonus_xp > 0 && (
            <p className="text-xs text-emerald-400 mt-0.5">+{quest.bonus_xp} bonus XP available</p>
          )}
        </div>
      </div>

      {/* Poster */}
      <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border mb-5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center font-heading font-bold text-primary text-sm">
          {quest.poster_username?.charAt(0)?.toUpperCase() || 'Q'}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Posted by <span className="text-primary">@{quest.poster_username || 'anonymous'}</span>
          </p>
          <p className={`text-xs mt-0.5 font-medium ${posterLevelInfo.color}`}>
            {posterLevelInfo.title} · Level {quest.poster_level || 1}
          </p>
        </div>
        {quest.poster_quests_count && (
          <span className="text-xs text-muted-foreground">{quest.poster_quests_count} quests</span>
        )}
      </div>

      {/* Time Left */}
      {timeLeft && (
        <div className="flex items-center gap-2 p-3.5 bg-secondary/50 rounded-xl border border-border mb-5">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Expires <strong className="text-foreground">{timeLeft}</strong></span>
          {quest.expires_at && (
            <span className="text-xs text-muted-foreground ml-auto">{moment(quest.expires_at).format('MMM D, h:mm A')}</span>
          )}
        </div>
      )}

      {/* Description */}
      {quest.description && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-foreground mb-2">About this Quest</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{quest.description}</p>
        </div>
      )}

      {/* Rules */}
      {quest.rules && (
        <div className="mb-5 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            Rules
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{quest.rules}</p>
        </div>
      )}

      {/* Competitors */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <Users className="w-4 h-4" />
        <span>
          <strong className="text-foreground">{quest.accepted_count || 0}</strong> quester{(quest.accepted_count || 0) !== 1 ? 's' : ''} on this
        </span>
        {quest.community_votes_enabled && (
          <span className="ml-auto text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            👥 Community vote decides
          </span>
        )}
      </div>

      {/* Accept Button */}
      <Button
        onClick={handleAccept}
        disabled={accepting || quest.status !== 'open'}
        className="w-full h-14 rounded-2xl font-heading font-semibold text-base bg-primary hover:bg-primary/90 text-primary-foreground glow-gold transition-all"
      >
        {accepting ? (
          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        ) : (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Accept Quest · {quest.xp_reward} XP
          </span>
        )}
      </Button>
    </motion.div>
  );
}
