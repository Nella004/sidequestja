import React from 'react';

const levelTitles = [
  { min: 1, max: 3, title: 'Rookie', color: 'text-slate-400', bg: 'bg-slate-500/15', border: 'border-slate-500/20' },
  { min: 4, max: 6, title: 'Explorer', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/20' },
  { min: 7, max: 10, title: 'Street Legend', color: 'text-sky-400', bg: 'bg-sky-500/15', border: 'border-sky-500/20' },
  { min: 11, max: 15, title: 'Island Champion', color: 'text-violet-400', bg: 'bg-violet-500/15', border: 'border-violet-500/20' },
  { min: 16, max: 99, title: 'Yardie God', color: 'text-primary', bg: 'bg-primary/15', border: 'border-primary/30' },
];

export function getLevelInfo(level) {
  return levelTitles.find(t => level >= t.min && level <= t.max) || levelTitles[0];
}

export function getXpForLevel(level) {
  return level * 500;
}

export default function LevelBadge({ level }) {
  const info = getLevelInfo(level);
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${info.bg} ${info.color} ${info.border}`}>
      Lvl {level} · {info.title}
    </span>
  );
}
