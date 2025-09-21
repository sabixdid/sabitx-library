import Link from 'next/link';

const tiles = [
  { k: 'legal', title: '#1 Legal', slugs: ['denton','deandra','ice'] },
  { k: 'business', title: '#2 Business', slugs: ['deport','hugo','dallas','walnut'] },
  { k: 'creative', title: '#3 Creative', slugs: ['book','webbrand','override'] },
  { k: 'personal', title: '#4 Personal', slugs: ['neuro','psych','bp'] },
  { k: 'control', title: '#5 Control', slugs: ['domains','accounts','schedule'] },
];

export function LibraryGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map(t => (
        <div key={t.k} className="border rounded-lg p-5 hover:shadow-sm">
          <div className="text-xl font-semibold mb-2">{t.title}</div>
          <div className="flex flex-wrap gap-2">
            {t.slugs.map(s => (
              <Link key={s} href={`/library/${t.k}/${s}`} className="text-xs px-2 py-1 border rounded">
                {s}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default LibraryGrid;
