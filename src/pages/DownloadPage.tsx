import { PageHero } from "../components/PageHero";

export const downloadRouteHandle = {
  documentTitle: "Download — Install SilverShop with Composer",
  metaDescription:
    "Install SilverShop on Silverstripe: use the silvershop/recipe Composer project for core plus major modules and add-ons, or start from silverstripe/installer and require silvershop/core only.",
};

export function DownloadPage() {
  return (
    <>
      <PageHero
        title="Download"
        introduction="Install SilverShop with Composer: use the official recipe for a full shop stack, or start with core only on a fresh Silverstripe project."
      />
      <section className="page-content">
        <div className="container">
          <div className="content-grid content-grid--2">
            <div>
              <h2>Full recipe (core and major add-ons)</h2>
              <p>
                The{" "}
                <a href="https://github.com/silvershop/recipe-silvershop">
                  <code>silvershop/recipe</code>
                </a>{" "}
                Composer recipe installs SilverShop Core plus bundled modules in one step: stock, discounts, shipping,
                product comparison, and colored variations (see the repo for pinned versions). Use this when you want the
                full starter stack rather than adding packages yourself.
              </p>
              <pre>
                <code>{`composer create-project silvershop/recipe myshop`}</code>
              </pre>
              <p>
                See the repository README for the exact module list and any version notes:{" "}
                <a href="https://github.com/silvershop/recipe-silvershop">github.com/silvershop/recipe-silvershop</a>.
              </p>

              <h2>Core only</h2>
              <p>
                For a minimal install, create a Silverstripe project and require SilverShop Core. Composer resolves
                transitive dependencies for you.
              </p>
              <pre>
                <code>{`composer create-project silverstripe/installer myshop
composer require -d myshop "silvershop/core"`}</code>
              </pre>
              <p>
                No Composer? Grab tagged archives from <a href="https://github.com/silvershop/silvershop-core">GitHub</a>{" "}
                and follow the Silverstripe installation docs.
              </p>
              <p>
                Further add-ons and modules are listed under the{" "}
                <a href="https://github.com/silvershop/">SilverShop organisation</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
