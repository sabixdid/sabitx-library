type Row = {
  id: string
  name: string
  uploaded_at: string
  url: string
}

type Props = {
  rows: Row[]
}

export function EvidenceTable({ rows }: Props) {
  return (
    <table className="w-full text-sm border">
      <thead className="bg-neutral-100 text-left">
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Uploaded</th>
          <th className="p-2">Link</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id} className="border-t">
            <td className="p-2">{r.name}</td>
            <td className="p-2">{new Date(r.uploaded_at).toLocaleString()}</td>
            <td className="p-2 text-blue-600 underline">
              <a href={r.url} target="_blank" rel="noreferrer">Open</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default EvidenceTable;
