"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

type ProjectGalleryProps = {
  project: Project;
};

function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Case-study screenshot browser: main shot at natural aspect ratio (no crop),
 * thumbnail switcher underneath when there's more than one image.
 */
export function ProjectGallery({ project }: ProjectGalleryProps) {
  const images = project.gallery ?? [
    { src: project.preview, label: project.name },
  ];
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="rounded-[12px] overflow-hidden border border-hair bg-iron-deep">
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-hair bg-iron-raised">
          <i className="w-2.5 h-2.5 rounded-full bg-[rgba(229,104,60,0.5)]" />
          <i className="w-2.5 h-2.5 rounded-full bg-[rgba(200,164,92,0.5)]" />
          <i className="w-2.5 h-2.5 rounded-full bg-[rgba(163,154,140,0.35)]" />
          <span className="ml-2.5 font-mono text-[10.5px] text-smoke-dim truncate">
            {hostOf(project.live)}
          </span>
        </div>
        <Image
          key={current.src}
          src={current.src}
          alt={`${current.label} — ${project.name}`}
          width={1024}
          height={514}
          sizes="(max-width: 920px) 100vw, 920px"
          priority={active === 0}
          className="w-full h-auto block"
        />
      </div>

      {images.length > 1 && (
        <div
          className="flex gap-3 mt-4 flex-wrap"
          role="tablist"
          aria-label={`${project.name} screenshots`}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={img.label}
              onClick={() => setActive(i)}
              className={`group text-left cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 rounded-[9px]`}
            >
              <span
                className={`block w-[132px] rounded-[9px] overflow-hidden border transition-colors ${
                  i === active
                    ? "border-brass"
                    : "border-hair hover:border-hair-strong"
                }`}
              >
                <Image
                  src={img.src}
                  alt=""
                  width={264}
                  height={133}
                  sizes="132px"
                  className={`w-full h-auto block transition-opacity ${
                    i === active ? "opacity-100" : "opacity-60 group-hover:opacity-90"
                  }`}
                />
              </span>
              <span
                className={`block mt-1.5 font-mono text-[10.5px] tracking-[0.08em] uppercase transition-colors ${
                  i === active ? "text-brass" : "text-smoke-dim"
                }`}
              >
                {img.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
