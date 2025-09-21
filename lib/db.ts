export async function fetchEvidence(category: string, project: string) {
  return [
    {
      id: '1',
      name: `${category}-${project}-placeholder.txt`,
      uploaded_at: new Date().toISOString(),
      url: '#'
    }
  ]
}
