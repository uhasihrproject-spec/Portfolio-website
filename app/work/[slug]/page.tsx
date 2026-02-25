import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import ProjectCaseStudy from "./project-case-study";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const p = await Promise.resolve(params);
  const project = PROJECTS.find((x) => x.slug === p.slug);
  if (!project) return notFound();

  return <ProjectCaseStudy project={project} />;
}