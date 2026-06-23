import React, { useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { MapPin, Search, Bell, Sparkles, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import QuestCard from '@/components/quest/QuestCard';
import QuestFilter from '@/components/quest/QuestFilter';

export default function Home() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadQuests();
  }, [filter]);

  const loadQuests = async () => {
  setLoading(true);
  try {
    let query = supabase
      .from('quests')
      .select('*')
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(30);

    if (filter !== 'all') {
      query = query.eq('quest_type', filter);
    }

    const { data, error } = await query;
    if (error) throw error;
    setQuests(data || []);
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
};

  const filteredQuests = search
    ? quests.filter(q =>
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.location?.toLowerCase().includes(search.toLowerCase())
      )
    : quests;

  const featuredQuests = filteredQuests.filter(q => q.is_featured);
  const regularQuests = filteredQuests.filter(q => !q.is_featured);

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground flex items-center gap-2">
            SideQuest
            <span className="text-xl">⚡</span>
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            Jamaica ·{' '}
            <span className="text-primary font-medium">{filteredQuests.length} quests live</span>
          </p>
        </div>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary border border-border hover:border-primary/30 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
      </div>

      {/* XP Banner */}
      <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-xl mb-5">
        <Flame className="w-5 h-5 text-primary shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Complete quests, earn XP, level up!</p>
          <p className="text-xs text-muted-foreground">No cash — just rep, glory, and bragging rights 🇯🇲</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search quests, locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-secondary/60 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <QuestFilter active={filter} onChange={setFilter} />
      </div>

      {/* Quest Feed */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : filteredQuests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-3xl">
            🔍
          </div>
          <p className="text-muted-foreground font-medium">No quests found</p>
          <p className="text-sm text-muted-foreground/60 mt-1">Try a different filter or post one yourself!</p>
        </motion.div>
      ) : (
        <div className="space-y-3 pb-4">
          {featuredQuests.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Featured</span>
              </div>
              {featuredQuests.map((quest, i) => (
                <QuestCard key={quest.id} quest={quest} index={i} />
              ))}
              {regularQuests.length > 0 && (
                <div className="pt-2 pb-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">All Quests</span>
                </div>
              )}
            </>
          )}
          {regularQuests.map((quest, i) => (
            <QuestCard key={quest.id} quest={quest} index={i + featuredQuests.length} />
          ))}
        </div>
      )}
    </div>
  );
}
