"use client";

import { Play, RotateCcw, Edit3, Trash2, CheckCircle2, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Scene {
  id: string | number;
  narrative: string;
  status: string;
  progress?: number;
}

interface TimelineProps {
  scenes: Scene[];
  masterPrompt?: string;
}

export default function Timeline({ scenes, masterPrompt }: TimelineProps) {
  return (
    <div className="flex-1 h-full overflow-y-auto p-8 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Timeline de Producción</h1>
          <p className="text-muted-foreground text-sm">Organiza y edita los clips generados por la IA.</p>
        </div>
        <button className="bg-white text-black font-bold px-6 py-2.5 rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 shadow-xl">
          EXPORTAR VIDEO FINAL
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {scenes.length > 0 ? (
          scenes.map((scene) => (
            <div key={scene.id} className="glass rounded-3xl overflow-hidden flex flex-col md:flex-row h-auto md:h-52 group transition-all hover:shadow-2xl hover:shadow-primary/5">
              {/* Preview Zone */}
              <div className="w-full md:w-36 lg:w-44 bg-muted relative flex items-center justify-center overflow-hidden shrink-0">
                {scene.status === "done" ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div className="w-full h-full bg-blue-900/20" /> {/* Placeholder for video frame */}
                    <Play size={24} className="text-white z-20 group-hover:scale-125 transition-transform" />
                    <div className="absolute top-2 right-2 z-20">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Clock size={24} className="text-muted-foreground animate-pulse" />
                    {scene.status === "generating" && scene.progress !== undefined && (
                      <div className="w-16 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${scene.progress}%` }} />
                      </div>
                    )}
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{scene.status}</span>
                  </div>
                )}
              </div>

              {/* Content Zone */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                  <p className="text-white font-medium mb-3 line-clamp-2">{scene.narrative}</p>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-xs text-muted-foreground italic">
                      <span className="text-primary/70 font-bold">Prompt IA: </span>
                      {masterPrompt ? `${masterPrompt} ` : ""}
                      {scene.narrative}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-white transition-colors">
                    <RotateCcw size={14} /> REGENERAR
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-white transition-colors">
                    <Edit3 size={14} /> EDITAR
                  </button>
                  <button className="ml-auto flex items-center gap-1.5 text-xs font-bold text-red-400/70 hover:text-red-400 transition-colors">
                    <Trash2 size={14} /> BORRAR
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-border text-center px-10">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileText size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Sin escenas</h3>
            <p className="text-muted-foreground max-w-xs text-sm">Sube un PDF narrativo en el panel de configuración para extraer las escenas automáticamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
