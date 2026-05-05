import { useEffect, useState } from "react";
import { SILVERSHOP_CORE_API_REPO } from "../constants";

type RepoPayload = {
  default_branch: string;
};

type CommitPayload = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    committer?: { date: string };
    author?: { date: string };
  };
};

export type SilvershopCoreLatestCommit = {
  shortSha: string;
  htmlUrl: string;
  committedAt: string;
  messageLine: string;
};

const githubJsonHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
} as const;

function truncateMessage(line: string, max: number): string {
  if (line.length <= max) return line;
  return `${line.slice(0, max - 1)}…`;
}

export function formatCommitDate(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function useSilvershopCoreLatestCommit() {
  const [data, setData] = useState<SilvershopCoreLatestCommit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const repoRes = await fetch(SILVERSHOP_CORE_API_REPO, {
          signal: ac.signal,
          headers: githubJsonHeaders,
        });
        if (!repoRes.ok) throw new Error("repo");
        const repoJson = (await repoRes.json()) as RepoPayload;
        const branch = repoJson.default_branch;

        const commitRes = await fetch(
          `${SILVERSHOP_CORE_API_REPO}/commits/${encodeURIComponent(branch)}`,
          { signal: ac.signal, headers: githubJsonHeaders },
        );
        if (!commitRes.ok) throw new Error("commit");
        const json = (await commitRes.json()) as CommitPayload;
        const date = json.commit.committer?.date ?? json.commit.author?.date ?? "";
        const messageLine = truncateMessage(
          json.commit.message.split("\n")[0]?.trim() ?? "",
          100,
        );
        setData({
          shortSha: json.sha.slice(0, 7),
          htmlUrl: json.html_url,
          committedAt: date,
          messageLine,
        });
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setData(null);
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  return { data, loading };
}
