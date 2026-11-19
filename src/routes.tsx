import { createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DownloadPage, downloadRouteHandle } from "./pages/DownloadPage";
import { ExtensionsPage, extensionsRouteHandle } from "./pages/ExtensionsPage";
import { FeaturesPage, featuresRouteHandle } from "./pages/FeaturesPage";
import { HomePage, homeRouteHandle } from "./pages/HomePage";
import { SupportPage, supportRouteHandle } from "./pages/SupportPage";

export const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} handle={homeRouteHandle} />
    <Route path="features" element={<FeaturesPage />} handle={featuresRouteHandle} />
    <Route path="extensions" element={<ExtensionsPage />} handle={extensionsRouteHandle} />
    <Route path="download" element={<DownloadPage />} handle={downloadRouteHandle} />
    <Route path="support" element={<SupportPage />} handle={supportRouteHandle} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
);

/** Paths pre-rendered to static HTML at build time (see scripts/prerender.mjs). */
export const PRERENDER_PATHS = ["/", "/features", "/extensions", "/download", "/support"];
