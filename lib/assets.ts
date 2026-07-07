/** Chain Forge Labs brand assets. Public SVGs live in `/public/brand/`. */

export const brand = {
  colors: {
    iron: "#15120F",
    brass: "#C8A45C",
    bone: "#F2EDE4",
  },
  paths: {
    mark: "/brand/cfl-mark.svg",
    badge: "/brand/cfl-badge.svg",
    lockup: "/brand/cfl-lockup.svg",
    stamp: "/brand/cfl-stamp.svg",
  },
  mark: {
    viewBox: "0 0 32 32",
    d: "M4 4h24v24H13L4 19Zm4.5 4.5v8.64l6.36 6.36h8.64V8.5Z",
  },
  badge: {
    viewBox: "0 0 40 40",
    cornerRadius: 10,
    d: "M8 8h24v24H17l-9-9Zm4.5 4.5v8.64l6.36 6.36h8.64V12.5Z",
  },
} as const;
