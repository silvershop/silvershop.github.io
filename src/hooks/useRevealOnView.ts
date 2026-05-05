import { useEffect } from "react";

/**
 * Adds `is-visible` to `.reveal` elements when they enter the viewport (matches former site.js).
 * `routeKey` should change when the page content changes so observers are reattached.
 */
export function useRevealOnView(enabled: boolean, routeKey: string) {
  useEffect(() => {
    if (!enabled) {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled, routeKey]);
}
