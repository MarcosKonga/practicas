-- Esquema de base de datos para StorySync AI

-- Tabla de Proyectos
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  style_config JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Escenas
CREATE TABLE scenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  narrative_text TEXT,
  visual_prompt TEXT,
  video_url TEXT,
  audio_url TEXT,
  position INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de Seguridad (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own projects" 
ON projects FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access scenes of their own projects" 
ON scenes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = scenes.project_id AND projects.user_id = auth.uid()
  )
);
