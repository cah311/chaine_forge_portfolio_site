import type { Project } from "@/lib/projects";
import type { RepoMeta } from "@/lib/github";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

type WorkGridProps = {
  projects: Project[];
  meta: RepoMeta[];
};

export function WorkGrid({ projects, meta }: WorkGridProps) {
  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="work">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="flex justify-between items-end gap-6 mb-[54px] flex-wrap">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Selected Work
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
              >
                The work is public.
                <br />
                Inspect it.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mt-[18px]">
              Four shipped products across four categories. Open the live builds.
              Read the code. We sell on proof, not promises.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-[22px]">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} meta={meta[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
