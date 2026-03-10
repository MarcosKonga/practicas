"use client";

import { cn } from "@/lib/utils";
import { FolderOpen, History, ExternalLink } from "lucide-react";

export default function Library() {
  const projects = [
    { id: 1, name: "El Caballero de Olmedo", scenes: 12, date: "Hace 2 horas", status: "completed" },
    { id: 2, name: "Leyendas del Mar", scenes: 8, date: "Ayer", status: "processing" },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto p-8">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white tracking-tight">Biblioteca de Historias</h1>
        <p className="text-muted-foreground text-sm">Tus creaciones y proyectos en curso.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-3xl p-6 hover:bg-white/[0.05] transition-all group flex flex-col h-full">
            <div className="w-full aspect-video bg-muted rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center">
              <FolderOpen size={32} className="text-muted-foreground/50 group-hover:scale-110 transition-transform" />
              {project.status === "processing" && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Procesando PDF...</span>
                  </div>
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1"><History size={12} /> {project.date}</span>
              <span className="flex items-center gap-1">• {project.scenes} escenas</span>
            </div>

            <div className="mt-auto flex gap-2">
              <button className="flex-1 bg-muted hover:bg-zinc-800 text-white py-2 rounded-xl text-xs font-bold transition-all">
                ABRIR PROYECTO
              </button>
              <button className="w-10 h-10 bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center rounded-xl transition-all">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
