import React from 'react';

const config = {
  easy: { label: 'Easy', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dots: 1 },
  medium: { label: 'Medium', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dots: 2 },
  hard: { label: 'Hard', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', dots: 3 },
  legendary: { label: 'Legendary', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', dots: 4 },
};

export default function DifficultyBadge({ difficulty }) {
  const d = config[difficulty] || config.easy;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${d.bg} ${d.color} ${d.border}`}>
      <span className="flex gap-0.5">
        {[...Array(4)].map((_, i) => (
          <span key={i} className={`w-1 h-1 rounded-full ${i < d.dots ? d.color.replace('text-', 'bg-') : 'bg-current opacity-20'}`} />
        ))}
      </span>
      {d.label}
    </span>
  );
}
