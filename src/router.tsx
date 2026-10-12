import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DownloadPage, downloadRouteHandle } from "./pages/DownloadPage";
import { ExtensionsPage, extensionsRouteHandle } from "./pages/ExtensionsPage";
import { FeaturesPage, featuresRouteHandle } from "./pages/FeaturesPage";
import { HomePage, homeRouteHandle } from "./pages/HomePage";
import { SupportPage, supportRouteHandle } from "./pages/SupportPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} handle={homeRouteHandle} />
      <Route path="features" element={<FeaturesPage />} handle={featuresRouteHandle} />
      <Route path="extensions" element={<ExtensionsPage />} handle={extensionsRouteHandle} />
      <Route path="download" element={<DownloadPage />} handle={downloadRouteHandle} />
      <Route path="support" element={<SupportPage />} handle={supportRouteHandle} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);
