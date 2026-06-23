import React from 'react';
import { Award } from 'lucide-react';

const badgeColors = {
  'Speed runner': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  'Food finder': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'Photo pro': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  '100% reliable': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Social butterfly': 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  'Trailblazer': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Top quester': 'bg-primary/15 text-primary border-primary/30',
};

export default function BadgeChip({ badge }) {
  const colors = badgeColors[badge] || 'bg-secondary text-muted-foreground border-border';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${colors}`}>
      <Award className="w-3 h-3" />
      {badge}
    </span>
  );
}
