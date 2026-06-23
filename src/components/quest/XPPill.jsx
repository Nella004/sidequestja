import React from 'react';
import { Sparkles } from 'lucide-react';

export default function XPPill({ xp, size = 'sm', bonus }) {
  const base = size === 'lg' ? 'px-3 py-1.5 text-sm gap-2' : 'px-2.5 py-1 text-xs gap-1';
  return (
    <span className={`inline-flex items-center font-heading font-bold rounded-full bg-primary/15 text-primary border border-primary/25 ${base}`}>
      <Sparkles className={size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'} />
      {xp} XP
      {bonus > 0 && <span className="text-emerald-400 ml-0.5">+{bonus}</span>}
    </span>
  );
}
