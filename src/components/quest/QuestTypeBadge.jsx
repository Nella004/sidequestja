import React from 'react';
import { Camera, Search, Users, Trophy, Zap, Music } from 'lucide-react';

const typeConfig = {
  photo: { label: 'Photo Quest', icon: Camera, bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/30' },
  find_it: { label: 'Find It', icon: Search, bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  social: { label: 'Social', icon: Users, bg: 'bg-pink-500/15', text: 'text-pink-400', border: 'border-pink-500/30' },
  open_challenge: { label: 'Challenge', icon: Trophy, bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  skill: { label: 'Skill Quest', icon: Zap, bg: 'bg-sky-500/15', text: 'text-sky-400', border: 'border-sky-500/30' },
  vibes: { label: 'Vibes', icon: Music, bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
};

export default function QuestTypeBadge({ type, size = 'sm' }) {
  const config = typeConfig[type] || typeConfig.vibes;
  const Icon = config.icon;
  const sizeClasses = size === 'lg' ? 'px-3 py-1.5 text-sm gap-2' : 'px-2 py-1 text-xs gap-1.5';

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}>
      <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} />
      {config.label}
    </span>
  );
}
