type Props = {
  category: string
  project: string
  description: string
}

export function ProjectHeader({ category, project, description }: Props) {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-bold">{category} · {project}</h1>
      <p className="text-neutral-500 text-sm">{description}</p>
    </header>
  )
}
export default ProjectHeader;
