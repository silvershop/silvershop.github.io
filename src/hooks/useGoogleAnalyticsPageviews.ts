import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useGoogleAnalyticsPageviews() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.ga !== "function") return;
    window.ga("set", "page", location.pathname + location.search + location.hash);
    window.ga("send", "pageview");
  }, [location.pathname, location.search, location.hash]);
}
