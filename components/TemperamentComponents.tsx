'use client';

import { useState, useEffect } from 'react';

interface TemperamentStats {
  trait: string;
  percentage: number;
  color: string;
}

interface InteractiveCardProps {
  temperament: string;
  archetype: string;
  color: string;
  description: string;
  emoji: string;
}

export function InteractiveTemperamentCard({
  temperament,
  archetype,
  color,
  description,
  emoji,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-8 rounded-lg border-2 transition-all duration-500 cursor-pointer transform ${
        isHovered ? 'scale-105 shadow-2xl' : 'scale-100'
      }`}
      style={{
        borderColor: color,
        backgroundColor: isHovered ? `${color}15` : 'transparent',
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-4xl mb-3">{emoji}</div>
          <h3 className="text-2xl font-bold text-white">{temperament}</h3>
          <p className="text-sm" style={{ color }}>
            {archetype}
          </p>
        </div>
      </div>

      <p className={`text-gray-300 text-sm leading-relaxed transition-all duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-75'
      }`}>
        {description}
      </p>

      {isHovered && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: `${color}40` }}>
          <p className="text-xs" style={{ color }}>
            Click to explore →
          </p>
        </div>
      )}
    </div>
  );
}

export function StatProgressBar({ trait, percentage, color }: TemperamentStats) {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-white">{trait}</span>
        <span className="text-xs font-bold" style={{ color }}>
          {displayPercentage}%
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${displayPercentage}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
}

export function AnimatedGlow({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <div
      className="absolute inset-0 rounded-lg blur-2xl opacity-20 animate-pulse"
      style={{
        backgroundColor: color,
        animationDelay: `${delay}s`,
      }}
    ></div>
  );
}
