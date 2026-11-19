import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom";
import type { RouteHandle } from "./components/DocumentHead";
import { PRERENDER_PATHS, routes } from "./routes";

export { PRERENDER_PATHS };

const handler = createStaticHandler(routes);

export async function render(path: string) {
  const context = await handler.query(new Request(`http://localhost${path}`));
  if (context instanceof Response) throw new Error(`Unexpected redirect while prerendering ${path}`);

  const router = createStaticRouter(handler.dataRoutes, context);
  const html = renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>
  );

  const last = context.matches[context.matches.length - 1];
  const handle = last?.route.handle as RouteHandle | undefined;
  return { html, handle };
}
