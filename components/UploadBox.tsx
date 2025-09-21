'use client';
import { useState } from 'react';

export function UploadBox({ category, project }: { category: string; project: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle'|'uploading'|'done'|'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setStatus('uploading');
    const form = new FormData();
    form.set('file', file);
    form.set('category', category);
    form.set('project', project);
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    setStatus(res.ok ? 'done' : 'error');
  }

  return (
    <form onSubmit={onSubmit} className="border rounded-lg p-4">
      <div className="text-sm font-medium mb-2">Upload new document</div>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="mb-3 block text-sm" />
      <button type="submit" disabled={!file || status==='uploading'} className="px-3 py-1.5 text-sm border rounded">
        {status==='uploading' ? 'Uploading…' : 'Upload'}
      </button>
      {status==='done' && <span className="ml-2 text-green-600 text-sm">Saved</span>}
      {status==='error' && <span className="ml-2 text-red-600 text-sm">Failed</span>}
    </form>
  );
}
