import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE!;
const bucket = 'sabitx-evidence';

const admin = createClient(url, key, { auth: { persistSession: false } });

export async function putFile(path: string, file: File | Blob, contentType?: string) {
  const { error } = await admin.storage.from(bucket).upload(path, file, { upsert: true, contentType });
  if (error) throw error;
  const { data } = admin.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
