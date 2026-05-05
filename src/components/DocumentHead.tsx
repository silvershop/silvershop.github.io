import { useEffect } from "react";
import { useMatches } from "react-router-dom";
import { SITE_DESCRIPTION } from "../constants";

export type RouteHandle = {
  documentTitle: string;
  metaDescription?: string;
};

export function DocumentHead() {
  const matches = useMatches();
  const last = matches[matches.length - 1];
  const handle = last?.handle as RouteHandle | undefined;

  useEffect(() => {
    if (!handle?.documentTitle) return;
    document.title = handle.documentTitle;
    const meta = document.querySelector('meta[name="description"]');
    const content = handle.metaDescription ?? SITE_DESCRIPTION;
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, [handle?.documentTitle, handle?.metaDescription]);

  return null;
}
