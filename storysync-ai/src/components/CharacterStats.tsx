"use client";

import { User, Shield, Zap, Sparkles } from "lucide-react";

interface CharacterStatsProps {
  attributes: {
    face: string;
    hair: string;
    clothing: string;
    style: string;
  };
}

export default function CharacterStats({ attributes }: CharacterStatsProps) {
  const stats = [
    { label: "Rostro", icon: User, value: attributes.face },
    { label: "Cabello", icon: Zap, value: attributes.hair },
    { label: "Vestimenta", icon: Shield, value: attributes.clothing },
    { label: "Estilo", icon: Sparkles, value: attributes.style },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <stat.icon size={14} className="text-primary" />
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</span>
          </div>
          <p className="text-xs text-white leading-tight">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
