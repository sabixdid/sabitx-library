import LibraryGrid from '../../components/LibraryGrid';

export default function LibraryHome() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-semibold mb-2">SABITX Library</h1>
      <p className="text-neutral-600 mb-6">Anchor, upload, and retrieve case documents with a clean index.</p>
      <LibraryGrid />
    </main>
  );
}
