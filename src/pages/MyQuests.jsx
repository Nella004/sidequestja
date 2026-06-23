import React, { useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Link } from 'react-router-dom';
import { ClipboardList, ChevronRight, CheckCircle2, Clock, Plus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import QuestTypeBadge from '@/components/quest/QuestTypeBadge';
import XPPill from '@/components/quest/XPPill';

const tabs = [
  { key: 'active', label: 'Active' },
  { key: 'posted', label: 'Posted' },
  { key: 'completed', label: 'Done' },
];

export default function MyQuests() {
  const [activeTab, setActiveTab] = useState('active');
  const [submissions, setSubmissions] = useState([]);
  const [postedQuests, setPostedQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    const [{ data: subs }, { data: posted }] = await Promise.all([
      supabase
        .from('quest_submissions')
        .select('*')
        .eq('created_by_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30),
      supabase
        .from('quests')
        .select('*')
        .eq('created_by_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30),
    ]);

    setSubmissions(subs || []);
    setPostedQuests(posted || []);
  } catch (e) { console.error(e); }
  setLoading(false);
};

  const active = submissions.filter(s => ['accepted', 'in_progress', 'submitted'].includes(s.status));
  const completed = submissions.filter(s => ['approved', 'completed'].includes(s.status));
  const currentList = activeTab === 'active' ? active : activeTab === 'posted' ? postedQuests : completed;

  const emptyMessages = {
    active: { emoji: '🗺️', title: 'No active quests', sub: 'Browse the feed and accept one!' },
    posted: { emoji: '✏️', title: 'No posted quests', sub: 'Post a quest for others to complete!' },
    completed: { emoji: '🏆', title: 'No completed quests yet', sub: 'Finish a quest to see it here' },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-xl text-foreground">My Quests</h1>
        <Link to="/post-quest" className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          <Plus className="w-4 h-4" />
          Post
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex bg-secondary/60 rounded-xl p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all relative ${activeTab === tab.key ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            {activeTab === tab.key && (
              <motion.div layoutId="activeTab" className="absolute inset-0 bg-card border border-border rounded-lg shadow-sm" transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }} />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : currentList.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center text-3xl">
            {emptyMessages[activeTab].emoji}
          </div>
          <p className="text-muted-foreground font-medium">{emptyMessages[activeTab].title}</p>
          <p className="text-sm text-muted-foreground/60 mt-1">{emptyMessages[activeTab].sub}</p>
          <Link to={activeTab === 'posted' ? '/post-quest' : '/'}>
            <button className="mt-4 px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-xl">
              {activeTab === 'posted' ? 'Post a Quest' : 'Explore Quests'}
            </button>
          </Link>
        </div>
      ) : activeTab === 'posted' ? (
        <div className="space-y-3">
          {postedQuests.map((quest, i) => (
            <motion.div key={quest.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/quest/${quest.id}`}>
                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{quest.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <QuestTypeBadge type={quest.quest_type} />
                      <span className="text-xs text-muted-foreground">{quest.accepted_count || 0} accepted</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <XPPill xp={quest.xp_reward} />
                    <span className={`text-xs ${quest.status === 'open' ? 'text-emerald-400' : 'text-muted-foreground'}`}>{quest.status}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {currentList.map((sub, i) => (
            <motion.div key={sub.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                {activeTab === 'completed'
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  : <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {sub.proof_text || `Quest in progress`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">{sub.status?.replace('_', ' ')}</p>
                </div>
                {activeTab === 'completed' && (
                  <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                    <Sparkles className="w-3 h-3" />
                    XP earned
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
