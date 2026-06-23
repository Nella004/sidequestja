import React from 'react';
import { Camera, Search, Users, Trophy, Zap, Music, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const filters = [
  { key: 'all', label: 'All', icon: Sparkles },
  { key: 'vibes', label: 'Vibes', icon: Music },
  { key: 'photo', label: 'Photo', icon: Camera },
  { key: 'find_it', label: 'Find It', icon: Search },
  { key: 'skill', label: 'Skill', icon: Zap },
  { key: 'social', label: 'Social', icon: Users },
  { key: 'open_challenge', label: 'Challenge', icon: Trophy },
];

export default function QuestFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {filters.map((f) => {
        const Icon = f.icon;
        const isActive = active === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" />
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
