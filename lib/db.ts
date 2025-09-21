import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE!;

export const supabase = createClient(url, anon);
export const supabaseAdmin = createClient(url, service, { auth: { persistSession: false } });

export async function fetchEvidence(category: string, project: string) {
  const { data, error } = await supabase
    .from('evidence')
    .select('*')
    .eq('category', category)
    .eq('project', project)
    .order('uploaded_at', { ascending: false });
  if (error) return [];
  return data || [];
}
