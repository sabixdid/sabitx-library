import { notFound } from 'next/navigation';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { UploadBox } from '../../../components/UploadBox';
import { EvidenceTable } from '../../../components/EvidenceTable';
import { supabaseAdmin } from '../../../lib/db';

const allowed: Record<string, string[]> = {
  legal: ['denton','deandra','ice'],
  business: ['deport','hugo','dallas','walnut'],
  creative: ['book','webbrand','override'],
  personal: ['neuro','psych','bp'],
  control: ['domains','accounts','schedule'],
};

export default async function ProjectPage({ params }: { params: { category: string; project: string } }) {
  const { category, project } = params;
  if (!allowed[category]?.includes(project)) notFound();

  const { data } = await supabaseAdmin
    .from('evidence')
    .select('*')
    .eq('category', category)
    .eq('project', project)
    .order('uploaded_at', { ascending: false });

  const descriptions: Record<string, string> = {
    legal: 'Active cases, filings, discovery, and motions.',
    business: 'Properties, POS/back office, security, vendors, finance.',
    creative: 'Book drafts, web/brand assets, override logs.',
    personal: 'Neuro stack logs, medical notes, family protocol.',
    control: 'Domains, accounts, master schedule.',
  };

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <ProjectHeader category={category} project={project} description={descriptions[category]} />
      <UploadBox category={category} project={project} />
      <EvidenceTable rows={(data || []) as any} />
    </main>
  );
}
