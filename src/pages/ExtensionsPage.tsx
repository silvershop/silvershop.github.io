import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { extensions, providerAvatarUrl, type Extension } from "../data/extensions";

export const extensionsRouteHandle = {
  documentTitle: "Extensions — Community SilverShop modules",
  metaDescription:
    "Community-built SilverShop extensions for Silverstripe CMS: search, reviews, wishlists, SEO, invoicing, newsletters, shipping labels and more, with Composer keys and links to each repository.",
};

const ALL_PROVIDERS = "";

function matchesQuery(ext: Extension, terms: string[]) {
  const haystack = `${ext.name} ${ext.moduleKey} ${ext.description} ${ext.provider.name}`.toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function ExtensionsPage() {
  const searchId = useId();
  const providerId = useId();
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState(ALL_PROVIDERS);

  const providers = useMemo(
    () => [...new Map(extensions.map((e) => [e.provider.login, e.provider])).values()],
    []
  );

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return extensions.filter(
      (ext) => (provider === ALL_PROVIDERS || ext.provider.login === provider) && matchesQuery(ext, terms)
    );
  }, [query, provider]);

  return (
    <>
      <PageHero
        title="Extensions"
        introduction="Community-maintained modules that add to SilverShop: search, reviews, SEO, invoicing, newsletters and more."
      />
      <section className="page-content">
        <div className="container">
          <header className="features-page__section-head">
            <h2 className="features-page__section-title">Community extensions</h2>
            <p className="features-page__section-lead">
              Install any of these with Composer using the module key. These modules are maintained by their authors,
              not the core team, so check each repository for compatibility and status. For the official packages, see{" "}
              <Link to="/features">Features</Link>.
            </p>
          </header>

          <div className="extensions-filter" role="search">
            <label htmlFor={searchId} className="visually-hidden">
              Filter extensions
            </label>
            <input
              id={searchId}
              type="search"
              className="extensions-filter__input"
              placeholder="Filter by name, key or description…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {providers.length > 1 ? (
              <>
                <label htmlFor={providerId} className="visually-hidden">
                  Provider
                </label>
                <select
                  id={providerId}
                  className="extensions-filter__select"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value={ALL_PROVIDERS}>All providers</option>
                  {providers.map((p) => (
                    <option key={p.login} value={p.login}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </>
            ) : null}
            <p className="extensions-filter__count" aria-live="polite">
              {filtered.length} of {extensions.length} extensions
            </p>
          </div>

          <div className="extensions-table__scroll">
            <table className="extensions-table">
              <thead>
                <tr>
                  <th scope="col">Extension</th>
                  <th scope="col">Description</th>
                  <th scope="col">Module key</th>
                  <th scope="col">Provided by</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ext) => (
                  <tr key={ext.moduleKey}>
                    <td className="extensions-table__name" data-label="Extension">
                      <a href={ext.url}>{ext.name}</a>
                    </td>
                    <td className="extensions-table__description" data-label="Description">
                      {ext.description}
                    </td>
                    <td className="extensions-table__key" data-label="Module key">
                      <code>{ext.moduleKey}</code>
                    </td>
                    <td className="extensions-table__provider" data-label="Provided by">
                      <a href={`https://github.com/${ext.provider.login}`} title={ext.provider.name}>
                        <img
                          src={providerAvatarUrl(ext.provider)}
                          alt=""
                          width={28}
                          height={28}
                          loading="lazy"
                          decoding="async"
                        />
                        <span>{ext.provider.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <p className="extensions-table__empty">No extensions match that filter.</p>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
