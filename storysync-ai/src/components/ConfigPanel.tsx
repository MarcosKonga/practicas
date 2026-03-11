import { useState } from "react";
import { Upload, FileText, Palette, Sparkles, Loader2, CheckCircle2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import CharacterStats from "./CharacterStats";

interface ConfigPanelProps {
  onCharacterAnalyzed: (data: any) => void;
  onNarrativeAnalyzed: (scenes: any[]) => void;
}

export default function ConfigPanel({ onCharacterAnalyzed, onNarrativeAnalyzed }: ConfigPanelProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzingNarrative, setAnalyzingNarrative] = useState(false);
  const [characterData, setCharacterData] = useState<null | {
    attributes: any;
    masterPrompt: string;
  }>(null);
  const [narrativeLoaded, setNarrativeLoaded] = useState(false);

  const handleCharacterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze-character", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setCharacterData(data);
      onCharacterAnalyzed(data);
    } catch (error) {
      console.error("Error analizando personaje:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleNarrativeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingNarrative(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze-narrative", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setNarrativeLoaded(true);
      onNarrativeAnalyzed(data.scenes);
    } catch (error) {
      console.error("Error analizando narrativa:", error);
    } finally {
      setAnalyzingNarrative(false);
    }
  };

  return (
    <div className="w-full lg:w-96 border-r border-border h-full bg-card/50 overflow-y-auto p-6 flex flex-col gap-8 shrink-0">
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Identidad Visual</span>
          {characterData && <CheckCircle2 size={14} className="text-emerald-400" />}
        </h2>
        
        {!characterData ? (
          <label className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group relative">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              accept=".pdf"
              onChange={handleCharacterUpload}
              disabled={analyzing}
            />
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
              {analyzing ? (
                <Loader2 size={20} className="text-primary animate-spin" />
              ) : (
                <Upload size={20} className="text-muted-foreground group-hover:text-primary" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{analyzing ? "Analizando..." : "PDF Técnico"}</p>
              <p className="text-xs text-muted-foreground">Blueprints & Personaje</p>
            </div>
          </label>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Shield size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase">ID Detectado</p>
                <p className="text-[10px] text-emerald-400/80 tracking-tighter truncate max-w-[180px]">
                  {characterData.masterPrompt}
                </p>
              </div>
              <button 
                onClick={() => setCharacterData(null)}
                className="ml-auto text-[10px] font-bold text-muted-foreground hover:text-white"
              >
                CAMBIAR
              </button>
            </div>
            <CharacterStats attributes={characterData.attributes} />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Narrativa</span>
          {narrativeLoaded && <CheckCircle2 size={14} className="text-emerald-400" />}
        </h2>
        
        <label className={cn(
          "border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group relative",
          narrativeLoaded ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:border-primary/50 hover:bg-primary/5"
        )}>
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            accept=".pdf"
            onChange={handleNarrativeUpload}
            disabled={analyzingNarrative}
          />
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
            {analyzingNarrative ? (
              <Loader2 size={20} className="text-primary animate-spin" />
            ) : narrativeLoaded ? (
              <CheckCircle2 size={20} className="text-emerald-400" />
            ) : (
              <FileText size={20} className="text-muted-foreground group-hover:text-primary" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white">
              {analyzingNarrative ? "Extrayendo Escenas..." : narrativeLoaded ? "Historia Cargada" : "PDF Storytelling"}
            </p>
            <p className="text-xs text-muted-foreground">Protagonista & Guion</p>
          </div>
        </label>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Estilo Maestro</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {["Cinemático", "Anime", "3D Render", "Acuarela"].map((style) => (
              <button 
                key={style}
                className="p-2 text-xs font-medium rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-white transition-all border border-transparent hover:border-primary/50"
              >
                {style}
              </button>
            ))}
          </div>
          <textarea 
            placeholder="Negative prompts globales..."
            className="w-full h-24 bg-muted/50 border border-border rounded-xl p-3 text-xs focus:ring-1 focus:ring-primary outline-none text-white resize-none"
          />
        </div>
      </div>

      <button className="mt-auto w-full bg-primary hover:bg-accent text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95">
        <Sparkles size={18} />
        GENERAR STORYBOARD
      </button>
    </div>
  );
}
