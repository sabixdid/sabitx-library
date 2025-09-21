import { NextRequest, NextResponse } from 'next/server';
import { putFile } from '../../../lib/storage';
import { supabaseAdmin } from '../../../lib/db';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const category = String(form.get('category') || '').toLowerCase();
  const project = String(form.get('project') || '').toLowerCase();
  if (!file || !category || !project) return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  const date = new Date().toISOString().slice(0,10);
  const safeCat = category.replace(/[^a-z0-9-]/g, '');
  const safeProj = project.replace(/[^a-z0-9-]/g, '');
  const filename = `${date}__${safeCat}__${safeProj}__${file.name}`;
  const path = `${safeCat}/${safeProj}/${date}/${filename}`;

  const url = await putFile(path, file, (file as any).type || 'application/octet-stream');
  const { error } = await supabaseAdmin.from('evidence').insert({
    category: safeCat,
    project: safeProj,
    filename,
    file_url: url,
    file_ext: filename.split('.').pop(),
    size_bytes: (file as any).size ?? null,
    status: 'Open',
    tags: [safeCat, safeProj],
    uploaded_by: 'sabitx'
  });
  if (error) return NextResponse.json({ error: 'db_error' }, { status: 500 });
  return NextResponse.json({ ok: true, url });
}
