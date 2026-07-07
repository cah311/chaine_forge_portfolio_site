import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ProjectPreview } from "@/components/project-preview";
import { caseStudyMetadata } from "@/lib/metadata";
import { projects, getProjectBySlug } from "@/lib/projects";
import { getRepoMeta } from "@/lib/github";
import { site } from "@/lib/site";
import { relTime } from "@/lib/rel-time";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return caseStudyMetadata(project.name, project.blurb, slug);
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const meta = await getRepoMeta(project.repo);
  const codeUrl = site.githubOrg
    ? `https://github.com/${site.githubOrg}/${project.repo}`
    : null;

  return (
    <>
      <Nav />
      <main className="pt-[140px] pb-[84px]">
        <div className="max-w-wrap mx-auto px-7 relative z-[2]">
          <Reveal>
            <Link
              href="/#work"
              className="font-mono text-xs text-smoke hover:text-brass transition-colors mb-8 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              ← Back to work
            </Link>
          </Reveal>

          <Reveal>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-brass mb-3.5 inline-block">
              {project.tag}
            </span>
          </Reveal>

          <Reveal>
            <h1
              className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mb-6"
            >
              {project.name}
            </h1>
          </Reveal>

          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mb-8">
              {project.blurb}
            </p>
          </Reveal>

          {meta && (
            <Reveal>
              <div
                className="flex items-center gap-[18px] font-mono text-xs text-smoke-dim mb-8"
              >
                <span className="text-smoke flex items-center gap-1.5">
                  <i className="w-[9px] h-[9px] rounded-full bg-brass" />
                  {meta.lang ?? project.lang}
                </span>
                <span className="text-brass">★ {meta.stars}</span>
                {meta.pushedAt && (
                  <span>updated {relTime(meta.pushedAt)}</span>
                )}
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="flex gap-2.5 mb-12">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-[15px] py-[9px] rounded-[9px] border border-hair-strong hover:border-brass hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                Live ↗
              </a>
              {codeUrl && (
                <a
                  href={codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-[15px] py-[9px] rounded-[9px] border border-hair-strong hover:border-brass hover:text-brass hover:bg-[rgba(200,164,92,0.06)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                >
                  View code ↗
                </a>
              )}
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-[920px] mb-14">
              <ProjectPreview
                project={project}
                eager
                sizes="(max-width: 920px) 100vw, 920px"
              />
            </div>
          </Reveal>

          <div className="grid gap-10 max-w-[720px]">
            <Reveal>
              <section>
                <h2 className="font-display font-bold text-xl mb-3 text-brass">
                  Problem
                </h2>
                <p className="text-smoke text-[15px] leading-relaxed">
                  {project.caseStudy.problem}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display font-bold text-xl mb-3 text-brass">
                  Approach
                </h2>
                <p className="text-smoke text-[15px] leading-relaxed">
                  {project.caseStudy.approach}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display font-bold text-xl mb-3 text-brass">
                  Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1.5 rounded-[9px] border border-hair-strong text-smoke"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display font-bold text-xl mb-3 text-brass">
                  Outcome
                </h2>
                <p className="text-smoke text-[15px] leading-relaxed">
                  {project.caseStudy.outcome}
                </p>
              </section>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
