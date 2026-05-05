import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ModuleIllustration } from "../components/ModuleFeatureIllustrations";
import { PageHero } from "../components/PageHero";

export const featuresRouteHandle = {
  documentTitle: "Features — Catalog, checkout & SilverShop modules",
  metaDescription:
    "What SilverShop offers for Silverstripe CMS: core catalog, cart, and checkout, plus discounts, shipping, stock modules, and links to each repository on GitHub.",
};

const GITHUB_ORG = "https://github.com/silvershop";
const GITHUB_CORE = "https://github.com/silvershop/silvershop-core";
const GITHUB_DISCOUNTS = "https://github.com/silvershop/silvershop-discounts";
const GITHUB_SHIPPING = "https://github.com/silvershop/silvershop-shipping";
const GITHUB_STOCK = "https://github.com/silvershop/silvershop-stock";

type ModuleCapability = {
  iconClass: string;
  text: string;
};

type ModuleCard = {
  packageName: string;
  illustration: "core" | "discounts" | "shipping";
  moduleUrl: string;
  summary: string;
  provides: ModuleCapability[];
};

function ModuleFeatureBlock({ packageName, illustration, moduleUrl, summary, provides }: ModuleCard) {
  return (
    <article className="module-feature reveal">
      <figure className="module-feature__media">
        <ModuleIllustration variant={illustration} />
      </figure>
      <div className="module-feature__body">
        <h3 className="module-feature__title">
          <a href={moduleUrl}>{packageName}</a>
        </h3>
        <p className="module-feature__summary">{summary}</p>
        <ul className="module-feature__provides">
          {provides.map((item) => (
            <li key={item.text} className="module-feature__provide-row">
              <span className="module-feature__provide-icon">
                <i className={item.iconClass} aria-hidden="true"></i>
              </span>
              <span className="module-feature__provide-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

type DetailFeature = {
  id: string;
  title: ReactNode;
  description: string;
};

function FeatureDetailCard({ title, description }: Omit<DetailFeature, "id">) {
  return (
    <article className="feature-detail reveal">
      <h3 className="feature-detail__title">{title}</h3>
      <p className="feature-detail__description">{description}</p>
    </article>
  );
}

const modules: ModuleCard[] = [
  {
    packageName: "silvershop-core",
    illustration: "core",
    moduleUrl: GITHUB_CORE,
    summary:
      "The main Composer package: storefront models, cart, checkout, orders, and integration points for tax, payments, and CMS reports.",
    provides: [
      { iconClass: "icon-shop", text: "Product catalog as customizable Page types with pricing, copy, and media" },
      { iconClass: "icon-layer", text: "Variations (e.g. size, colour) with their own SKUs, prices, and images" },
      { iconClass: "icon-shopping-cart", text: "Shopping cart, order records, and a composable checkout pipeline" },
      { iconClass: "icon-percentage-circle", text: "Tax basis and line totals — country-aware or flat rules, inclusive or exclusive display" },
      { iconClass: "icon-card", text: "Payment flows via Silverstripe Omnipay and the PHP Omnipay gateway ecosystem" },
      { iconClass: "icon-translate", text: "Translated storefront templates and shop UI strings in the CMS" },
      { iconClass: "icon-chart-square", text: "Hooks into Silverstripe Reports for customers, products, and sales periods" },
    ],
  },
  {
    packageName: "silvershop-discounts",
    illustration: "discounts",
    moduleUrl: GITHUB_DISCOUNTS,
    summary: "Optional add-on for promotions: coupon codes and rule-based savings on cart lines or the whole order.",
    provides: [
      { iconClass: "icon-ticket-discount", text: "Issued coupon codes and reusable promotion definitions" },
      { iconClass: "icon-receipt-discount", text: "Fixed or percentage discounts applied to qualifying lines or the cart total" },
      { iconClass: "icon-routing", text: "Discount logic wired into SilverShop cart and order models" },
    ],
  },
  {
    packageName: "silvershop-shipping",
    illustration: "shipping",
    moduleUrl: GITHUB_SHIPPING,
    summary: "Optional shipping layer: quote shipping on the cart and persist shipping lines on completed orders.",
    provides: [
      { iconClass: "icon-truck-fast", text: "Built-in estimators such as flat rate, zones, and distance-based rules" },
      { iconClass: "icon-global", text: "Extension points to plug in carrier APIs or custom table-rate logic" },
      { iconClass: "icon-receipt-item", text: "Shipping amounts stored with orders alongside product lines" },
    ],
  },
];

const detailFeatures: DetailFeature[] = [
  {
    id: "product-pages",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        Product pages in the CMS
      </a>
    ),
    description:
      "Authors work in familiar SiteTree pages; products are PHP Page subclasses you can extend with fields and relations.",
  },
  {
    id: "csv-import",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        Bulk CSV import
      </a>
    ),
    description: "Bring catalog updates from spreadsheets in addition to one-by-one CMS authoring.",
  },
  {
    id: "variations",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        Attribute variations
      </a>
    ),
    description: "Model options like size or finish; each variation can carry its own price, stock key, and gallery.",
  },
  {
    id: "checkout-pipeline",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        Checkout pipeline
      </a>
    ),
    description:
      "Compose CheckoutComponent steps for multi-page flows or collapse to a single page; align with your UX and compliance needs.",
  },
  {
    id: "members-addresses",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        Members &amp; addresses
      </a>
    ),
    description: "Optional member login at checkout and saved addresses when you use Silverstripe’s member model.",
  },
  {
    id: "discount-rules",
    title: (
      <a href={GITHUB_DISCOUNTS} className="feature-detail__title-link">
        Cart-wide &amp; line-level deals
      </a>
    ),
    description: "Layer percentage or fixed reductions from the discounts module without forking core cart math.",
  },
  {
    id: "shipping-quotes",
    title: (
      <a href={GITHUB_SHIPPING} className="feature-detail__title-link">
        Shipping quotes before pay
      </a>
    ),
    description: "Customers see shipping estimates in the cart; chosen methods flow into the order total.",
  },
  {
    id: "tax-display",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        GST / VAT style totals
      </a>
    ),
    description: "Configure whether storefront prices and invoices read as tax-inclusive or tax-exclusive.",
  },
  {
    id: "omnipay-gateways",
    title: (
      <>
        <a href={GITHUB_CORE} className="feature-detail__title-link">
          Gateway breadth
        </a>{" "}
        <span className="feature-detail__title-note">(via Omnipay)</span>
      </>
    ),
    description:
      "Stripe, PayPal, and regional acquirers ship as Composer packages around league/omnipay; wire them through Silverstripe Omnipay.",
  },
  {
    id: "reports",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        Sales &amp; catalog reports
      </a>
    ),
    description: "Weekly and monthly rollups, customer lists, and product performance when Reports is installed.",
  },
  {
    id: "i18n",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        i18n-ready storefront
      </a>
    ),
    description: "Translate buyer-facing templates and labels; align with your chosen Silverstripe translation approach.",
  },
  {
    id: "stock",
    title: (
      <a href={GITHUB_STOCK} className="feature-detail__title-link">
        silvershop-stock
      </a>
    ),
    description: "Optional inventory module for quantity on hand, reservations, and low-stock awareness in the CMS.",
  },
  {
    id: "tests-ci",
    title: (
      <a href={GITHUB_ORG} className="feature-detail__title-link">
        Tests &amp; CI
      </a>
    ),
    description: "Core and maintained modules run PHPUnit (and related tooling) in CI to guard public APIs.",
  },
  {
    id: "community-support",
    title: (
      <Link to="/support" className="feature-detail__title-link">
        Community support
      </Link>
    ),
    description: "Issue trackers, chat, and maintainers who review contributions across the organisation.",
  },
  {
    id: "extension-model",
    title: (
      <a href={GITHUB_CORE} className="feature-detail__title-link">
        Silverstripe-native extension
      </a>
    ),
    description: "Use Injector, YAML config, DataExtension, and template overrides the same way as the rest of your site.",
  },
];

export function FeaturesPage() {
  return (
    <>
      <PageHero
        title="Features"
        introduction="SilverShop is split into a core package and optional modules — compose only what your project needs."
      />
      <section className="page-content">
        <div className="container">
          <header className="features-page__section-head">
            <h2 className="features-page__section-title">What each module provides</h2>
            <p className="features-page__section-lead">
              Install <strong>silvershop-core</strong> for the shop itself; add discounts and shipping when those concerns
              belong in your build. Each card links to the matching repository on{" "}
              <a href={GITHUB_ORG}>github.com/silvershop</a>.
            </p>
          </header>
          <div className="content-grid content-grid--3">
            {modules.map((m) => (
              <ModuleFeatureBlock key={m.packageName} {...m} />
            ))}
          </div>

          <hr />

          <header className="features-page__section-head">
            <h2 className="features-page__section-title">Capabilities in detail</h2>
            <p className="features-page__section-lead">
              Finer-grained behaviour you get from core, optional modules, and the wider{" "}
              <a href={GITHUB_ORG}>SilverShop organisation</a>.
            </p>
          </header>
          <div className="content-grid content-grid--3 content-grid--dense">
            {detailFeatures.map(({ id, ...card }) => (
              <FeatureDetailCard key={id} {...card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
