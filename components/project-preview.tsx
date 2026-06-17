"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

type ProjectPreviewProps = {
  project: Project;
  /** Load immediately instead of lazily — use for above-the-fold hero images. */
  eager?: boolean;
  /** Responsive `sizes` hint for the optimizer. */
  sizes?: string;
  className?: string;
};

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function ProjectPreview({
  project,
  eager = false,
  sizes = "(max-width: 900px) 100vw, 50vw",
  className = "",
}: ProjectPreviewProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`rounded-[12px] overflow-hidden border border-hair bg-iron-deep ${className}`}
    >
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-hair bg-iron-raised">
        <i className="w-2.5 h-2.5 rounded-full bg-[rgba(229,104,60,0.5)]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[rgba(200,164,92,0.5)]" />
        <i className="w-2.5 h-2.5 rounded-full bg-[rgba(163,154,140,0.35)]" />
        <span className="ml-2.5 font-mono text-[10.5px] text-smoke-dim truncate">
          {hostOf(project.live)}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-iron">
        {errored ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,rgba(200,164,92,0.10),transparent_55%)]">
            <span className="font-display font-bold text-2xl text-bone/85 tracking-[-0.02em] text-center px-6">
              {project.name}
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-smoke-dim">
              Preview coming soon
            </span>
          </div>
        ) : (
          <Image
            src={project.preview}
            alt={`Screenshot of the ${project.name} website`}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            onError={() => setErrored(true)}
            className="object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}
