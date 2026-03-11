"use client";

import { LayoutGrid, PlusSquare, Settings, Library, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { User as UserType } from "@supabase/supabase-js";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sessionUser: UserType | null;
}

export default function Sidebar({ activeTab, setActiveTab, sessionUser }: SidebarProps) {
  const handleLogout = async () => {
    localStorage.removeItem("storysync_demo");
    await supabase.auth.signOut();
    window.location.reload();
  };

  const items = [
    { id: "editor", icon: PlusSquare, label: "Nuevo Proyecto" },
    { id: "library", icon: Library, label: "Biblioteca" },
    { id: "settings", icon: Settings, label: "Ajustes" },
  ];

  return (
    <div className="w-20 lg:w-64 h-screen border-r border-border bg-card flex flex-col p-4 transition-all overflow-hidden shrink-0">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="font-bold text-white text-xl">S</span>
        </div>
        <span className="font-bold text-xl hidden lg:block tracking-tight text-white">StorySync AI</span>
      </div>

      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all group",
              activeTab === item.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:bg-muted hover:text-white"
            )}
          >
            <item.icon className={cn("shrink-0", activeTab === item.id ? "" : "group-hover:scale-110 transition-transform")} size={24} />
            <span className="font-medium hidden lg:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-4 border-t border-border mt-auto space-y-2">
        <div className="px-3 py-2 hidden lg:block">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Usuario</p>
          <p className="text-xs text-white truncate font-medium">{sessionUser?.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all font-medium"
        >
          <LogOut size={24} />
          <span className="hidden lg:block">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
