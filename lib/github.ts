import "server-only";

export type RepoMeta = {
  stars: number;
  lang: string | null;
  pushedAt: string | null;
} | null;

export async function getRepoMeta(repo: string): Promise<RepoMeta> {
  const org = process.env.GITHUB_ORG;
  if (!org) return null;

  try {
    const res = await fetch(`https://api.github.com/repos/${org}/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      stars: d.stargazers_count ?? 0,
      lang: d.language ?? null,
      pushedAt: d.pushed_at ?? null,
    };
  } catch {
    return null;
  }
}

export async function getAllRepoMeta(
  repos: string[],
): Promise<RepoMeta[]> {
  return Promise.all(repos.map((repo) => getRepoMeta(repo)));
}
