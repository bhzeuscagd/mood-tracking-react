-- 1. Tabla Principal de Registros de Ánimo
CREATE TABLE public.daily_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    mood_score SMALLINT NOT NULL, -- Ej: 2 (Very Happy), -2 (Very Sad)
    sleep_hours TEXT NOT NULL,    -- Ej: "7_8"
    tags TEXT[] DEFAULT '{}',     -- Array de strings para mayor rendimiento
    reflection TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Performance: Índice crucial para las consultas del Dashboard (schema-indexes)
CREATE INDEX idx_daily_logs_user_id ON public.daily_logs(user_id);
CREATE INDEX idx_daily_logs_created_at ON public.daily_logs(created_at DESC);

-- 3. Security: Activar RLS (security-rls)
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;

-- 4. Policies: Un usuario solo puede ver, insertar y modificar SUS PROPIOS registros
CREATE POLICY "Users can view own logs" ON public.daily_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own logs" ON public.daily_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own logs" ON public.daily_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own logs" ON public.daily_logs FOR DELETE USING (auth.uid() = user_id);
