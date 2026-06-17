"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import type { RepoMeta } from "@/lib/github";
import { site } from "@/lib/site";
import { relTime } from "@/lib/rel-time";
import { Reveal } from "@/components/reveal";
import { ProjectPreview } from "@/components/project-preview";

type ProjectCardProps = {
  project: Project;
  meta: RepoMeta;
};

export function ProjectCard({ project, meta }: ProjectCardProps) {
  const stars = meta ? `★ ${meta.stars}` : "";
  const lang = meta?.lang ?? project.lang;
  const when = meta?.pushedAt ? `updated ${relTime(meta.pushedAt)}` : "";
  const codeUrl = site.githubOrg
    ? `https://github.com/${site.githubOrg}/${project.repo}`
    : null;

  return (
    <Reveal>
      <article
        className="group border border-hair rounded-[14px] p-7 bg-iron-raised relative overflow-hidden transition-all duration-350 hover:-translate-y-1 hover:border-hair-strong before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-brass before:scale-y-0 before:origin-top before:transition-transform before:duration-350 group-hover:before:scale-y-100"
      >
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View ${project.name} case study`}
          className="block mb-5 [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 rounded-[12px]"
        >
          <ProjectPreview project={project} />
        </Link>
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-brass mb-3.5 inline-block">
          {project.tag}
        </span>
        <h3 className="font-display font-bold text-2xl mb-2.5">
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
          >
            {project.name}
          </Link>
        </h3>
        <p className="text-smoke text-[15px] mb-5.5">{project.blurb}</p>
        <div className="flex items-center gap-[18px] font-mono text-xs text-smoke-dim mb-5 min-h-[14px]">
          <span className="text-smoke flex items-center gap-1.5">
            <i className="w-[9px] h-[9px] rounded-full bg-brass" />
            {lang}
          </span>
          {stars && <span className="text-brass">{stars}</span>}
          {when && <span>{when}</span>}
        </div>
        <div className="flex gap-2.5">
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
      </article>
    </Reveal>
  );
}
