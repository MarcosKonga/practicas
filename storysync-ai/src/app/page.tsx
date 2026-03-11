"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import ConfigPanel from "@/components/ConfigPanel";
import Timeline from "@/components/Timeline";
import Library from "@/components/Library";
import Auth from "@/components/Auth";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [activeTab, setActiveTab] = useState("editor");
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [scenes, setScenes] = useState<any[]>([]);
  const [characterData, setCharacterData] = useState<any>(null);

  useEffect(() => {
    const isDemo = localStorage.getItem("storysync_demo") === "true";
    if (isDemo) {
      const demoEmail = localStorage.getItem("storysync_demo_email") || "demo@storysync.ai";
      setSession({ user: { email: demoEmail } } as any);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <main className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} sessionUser={session?.user ?? null} />
      
      <div className="flex-1 flex overflow-hidden">
        {activeTab === "editor" ? (
          <>
            <ConfigPanel 
              onCharacterAnalyzed={(data) => setCharacterData(data)} 
              onNarrativeAnalyzed={(extractedScenes) => setScenes(extractedScenes)} 
            />
            <Timeline scenes={scenes} masterPrompt={characterData?.masterPrompt} />
          </>
        ) : activeTab === "library" ? (
          <Library />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl">⏳</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Panel en construcción</h2>
            <p className="text-muted-foreground max-w-xs">Esta sección estará disponible una vez que completemos la integración del backend.</p>
          </div>
        )}
      </div>
    </main>
  );
}
