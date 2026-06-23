import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import QuestTypeBadge from './QuestTypeBadge';
import DifficultyBadge from './DifficultyBadge';
import XPPill from './XPPill';
import moment from 'moment';

export default function QuestCard({ quest, index = 0 }) {
  const timeLeft = quest.expires_at ? moment(quest.expires_at).fromNow() : null;
  const isExpiringSoon = quest.expires_at && moment(quest.expires_at).diff(moment(), 'hours') < 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link to={`/quest/${quest.id}`}>
        <div className={`group relative bg-card border rounded-2xl p-5 transition-all duration-300 cursor-pointer
          ${quest.is_featured
            ? 'border-primary/40 glow-gold'
            : 'border-border hover:border-primary/30 hover:glow-gold'}`}
        >
          {quest.is_featured && (
            <div className="absolute -top-2.5 right-4 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-3 py-0.5 rounded-full shadow-lg shadow-primary/25">
              ✦ Featured
            </div>
          )}

          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
              {quest.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {quest.location}
            </span>
            {timeLeft && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className={`flex items-center gap-1 ${isExpiringSoon ? 'text-red-400' : ''}`}>
                  <Clock className="w-3 h-3" />
                  {isExpiringSoon ? 'Ending soon' : `${timeLeft}`}
                </span>
              </>
            )}
            {quest.accepted_count > 0 && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {quest.accepted_count}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <QuestTypeBadge type={quest.quest_type} />
              <DifficultyBadge difficulty={quest.difficulty} />
            </div>
            <XPPill xp={quest.xp_reward} bonus={quest.bonus_xp} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
