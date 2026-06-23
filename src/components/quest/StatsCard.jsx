import React from 'react';

export default function StatsCard({ label, value, sub }) {
  return (
    <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl border border-border">
      <span className="font-heading font-bold text-2xl text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
      {sub && <span className="text-xs text-primary mt-0.5">{sub}</span>}
    </div>
  );
}
