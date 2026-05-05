import { Link } from "react-router-dom";
import { HeroShaderBackground } from "../components/HeroShaderBackground";
import { SILVERSHOP_CORE_REPO, SITE_DESCRIPTION } from "../constants";
import { formatCommitDate, useSilvershopCoreLatestCommit } from "../hooks/useSilvershopCoreLatestCommit";

export const homeRouteHandle = {
  documentTitle: "SilverShop — Open-source e-commerce for Silverstripe CMS",
  metaDescription: SITE_DESCRIPTION,
};

export function HomePage() {
  const { data: latestCommit, loading: commitLoading } = useSilvershopCoreLatestCommit();

  return (
    <>
      <section className="hero hero--with-logo" aria-labelledby="hero-heading">
        <HeroShaderBackground />
        <Link className="hero__logo" to="/">
          <span className="visually-hidden">SilverShop home</span>
        </Link>
        <div className="container">
          <h1 id="hero-heading">Open source e-commerce module for Silverstripe</h1>
          <p className="hero__lead">
            BSD-licensed shop tooling for Silverstripe CMS — flexible checkout, catalog, payments, and extensions.
          </p>
          <div className="hero__actions">
            <Link to="/download" className="btn btn--primary">
              Download
            </Link>
            <a href="/features" className="btn btn--ghost">
              Learn more <i className="icon-arrow-down icon-before" aria-hidden="true"></i>
            </a>
          </div>
          <p className="hero__meta">
            {commitLoading ? (
              <span aria-busy="true">Loading latest commit…</span>
            ) : latestCommit ? (
              <>
                Latest commit on{" "}
                <a href={SILVERSHOP_CORE_REPO}>silvershop-core</a>: <strong>{latestCommit.shortSha}</strong> (
                {formatCommitDate(latestCommit.committedAt)}).{" "}
                {latestCommit.messageLine ? <>{latestCommit.messageLine}. </> : null}
                <a href={latestCommit.htmlUrl}>View on GitHub</a>
                {" · "}
                <a href={`${SILVERSHOP_CORE_REPO}/releases`}>Releases</a>
              </>
            ) : (
              <>
                See <a href={`${SILVERSHOP_CORE_REPO}/commits`}>commits</a> and{" "}
                <a href={`${SILVERSHOP_CORE_REPO}/releases`}>releases</a> on GitHub.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="features-strip" id="features">
        <div className="container features-strip__grid">
          <article className="feature-card reveal">
            <div className="feature-card__icon" aria-hidden="true">
              <i className="icon-monitor"></i>
            </div>
            <div>
              <h2>Storefront-ready</h2>
              <p>
                Responsive cart and catalog patterns you can ship as-is or theme to match your Silverstripe project.
              </p>
            </div>
          </article>
          <article className="feature-card reveal reveal-delay-1">
            <div className="feature-card__icon" aria-hidden="true">
              <i className="icon-route-square"></i>
            </div>
            <div>
              <h2>Extensible</h2>
              <p>
                Tailor checkout, shipping, tax, and promotions with modules and standard Silverstripe extension points.
              </p>
              <Link to="/features" className="btn btn--text">
                More features <i className="icon-arrow-right icon-before" aria-hidden="true"></i>
              </Link>
            </div>
          </article>
          <article className="feature-card reveal reveal-delay-2">
            <div className="feature-card__icon" aria-hidden="true">
              <i className="icon-heart"></i>
            </div>
            <div>
              <h2>Open source</h2>
              <p>BSD-licensed core with an active community — issue trackers, Slack, and regular releases.</p>
              <Link to="/support" className="btn btn--text">
                Support <i className="icon-arrow-right icon-before" aria-hidden="true"></i>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
