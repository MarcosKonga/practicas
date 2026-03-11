"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success", text: string } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Si las claves de Supabase no están configuradas o contienen "your-project", usamos el modo demo
    const isSupabaseConfigured = 
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

    if (!isSupabaseConfigured) {
      console.log("Supabase no configurado, entrando en modo Demo...");
      setTimeout(() => {
        localStorage.setItem("storysync_demo", "true");
        localStorage.setItem("storysync_demo_email", email);
        window.location.reload();
      }, 1000);
      return;
    }

    try {
      const { error } = isRegister 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: isRegister ? "¡Registro exitoso! Revisa tu email." : "¡Bienvenido!" });
      }
    } catch (e) {
      console.error("Error de conexión:", e);
      // Si falla por conexión (fetch error), probablemente las claves sean inválidas/falsas
      // Así que forzamos la entrada en modo demo para que el usuario no se bloquee
      localStorage.setItem("storysync_demo", "true");
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md glass p-10 rounded-[2.5rem] shadow-2xl space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">StorySync AI</h1>
          <p className="text-muted-foreground mt-2">Transforma tus historias en clips virales</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="email" 
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                required
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-sm font-medium ${message.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
              {message.text}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-accent text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (isRegister ? "CREAR CUENTA" : "ENTRAR")}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute w-full h-[1px] bg-border"></div>
          <span className="relative px-3 bg-[#09090b] text-[10px] font-bold text-muted-foreground uppercase tracking-widest">O prueba la UI</span>
        </div>

        <button 
          onClick={() => {
            localStorage.setItem("storysync_demo", "true");
            window.location.reload();
          }}
          className="w-full bg-muted hover:bg-zinc-800 text-white font-bold py-3 rounded-2xl border border-border transition-all flex items-center justify-center gap-2"
        >
          EXPLORAR MODO DEMO
        </button>

        <p className="text-center text-sm text-muted-foreground">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta aún?"}{" "}
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-primary font-bold hover:underline"
          >
            {isRegister ? "Inicia sesión" : "Regístrate gratis"}
          </button>
        </p>
      </div>
    </div>
  );
}
