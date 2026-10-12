export type ExtensionProvider = {
  /** GitHub login — also used to resolve the avatar. */
  login: string;
  name: string;
};

export type Extension = {
  name: string;
  /** Composer package name, e.g. `silvershop/wishlist`. */
  moduleKey: string;
  url: string;
  description: string;
  provider: ExtensionProvider;
};

export const PROVIDERS = {
  rvxd: { login: "RVXD", name: "RVXD" },
} satisfies Record<string, ExtensionProvider>;

export function providerAvatarUrl(provider: ExtensionProvider, size = 64) {
  return `https://github.com/${provider.login}.png?size=${size}`;
}

function rvxd(repo: string, moduleKey: string, description: string): Extension {
  return {
    name: repo,
    moduleKey,
    url: `https://github.com/RVXD/${repo}`,
    description,
    provider: PROVIDERS.rvxd,
  };
}

export const extensions: Extension[] = [
  rvxd(
    "silvershop-address-formats",
    "silvershop/address-formats",
    "Per-country address field rules for SilverShop: labels, required fields, postcode validation and formatting. Fixes per-country checkout and provides a reusable address formatter."
  ),
  rvxd(
    "silvershop-analytics",
    "silvershop/analytics",
    "Catalog analytics for SilverShop: privacy-friendly product-view tracking and a most-viewed-products report, with a record() API that a search module can feed for search-term reports."
  ),
  rvxd(
    "silvershop-api",
    "silvershop/api",
    "Headless REST API for SilverShop (SilverStripe CMS 6): catalog/cart/order/customer resources, token auth with scopes, pagination, pluggable resources/serializers and order webhooks. A backwards-compatible superset of core's api/v1."
  ),
  rvxd(
    "silvershop-brands",
    "silvershop/brands",
    "Native product brands / manufacturers for SilverShop: a Brand model, product-to-brand link, and a sales-by-brand report."
  ),
  rvxd(
    "silvershop-category-index",
    "silvershop/category-index",
    "Derived, queryable flat index of product-to-category membership (primary + ancestors + secondary) for fast recursive category filtering in SilverShop."
  ),
  rvxd(
    "silvershop-colors",
    "silvershop/colors",
    "Product colours for SilverShop: a hex-swatch colour palette, product-level multi-colour tags, hex-valued colour variations, and a colour facet for the storefront search."
  ),
  rvxd(
    "silvershop-cookieconsent",
    "silvershop/cookieconsent",
    "A first-class, self-hosted consent-management platform (CMP) for SilverStripe: an accessible cookie banner + in-banner preferences centre, a server + JS consent-state API ($HasConsent), true script/tag blocking, Google Consent Mode v2 signalling and an immutable consent log. Works on any SilverStripe 6 site - no shop dependency."
  ),
  rvxd(
    "silvershop-currency-format",
    "silvershop/currency-format",
    "Set the shop base currency in the CMS (Settings > Shop) and render prices locale-aware for it (ICU): correct symbol, placement, separators and decimals. A drop-in for single-currency shops that would otherwise configure currency via YAML."
  ),
  rvxd(
    "silvershop-downloads",
    "silvershop/downloads",
    "Downloadable (digital) products for SilverShop: attach files to a product and let paying customers download them through a secure, ownership-checked link."
  ),
  rvxd(
    "silvershop-invoicing",
    "silvershop/invoicing",
    "Immutable financial documents (invoices / credit memos) with overridable templates for SilverShop."
  ),
  rvxd(
    "silvershop-ledger",
    "silvershop/ledger",
    "An immutable financial posting ledger / audit trail for SilverShop orders and payments."
  ),
  rvxd(
    "silvershop-newsletter",
    "silvershop/newsletter",
    "Newsletter signup, marketing consent, double opt-in and queued ESP synchronisation for SilverShop. Works on any SilverStripe 6 site; checkout and order integration light up when silvershop/core is present."
  ),
  rvxd(
    "silvershop-newsletter-campaignmonitor",
    "silvershop/newsletter-campaignmonitor",
    "Campaign Monitor ESP adapter for silvershop/newsletter: syncs subscribers to a Campaign Monitor list via a thin Guzzle client, with a webhook back to the local list."
  ),
  rvxd(
    "silvershop-newsletter-mailchimp",
    "silvershop/newsletter-mailchimp",
    "Mailchimp ESP adapter for silvershop/newsletter: syncs subscribers to a Mailchimp audience via a thin Guzzle client, with a webhook back to the local list."
  ),
  rvxd(
    "silvershop-product-bundles",
    "silvershop/product-bundles",
    "Product bundles for SilverShop: sell a product that groups other products, with per-component quantities and automatic component stock linkage."
  ),
  rvxd(
    "silvershop-product-gallery",
    "silvershop/product-gallery",
    "Sortable image galleries for SilverShop products and variations: data model, CMS admin with drag-sort + bulk upload, template accessors, and an overridable frontend include."
  ),
  rvxd(
    "silvershop-related-products",
    "silvershop/related-products",
    "Related, up-sell and cross-sell product relations for SilverShop: hand-curated links shown on the product page and in the cart."
  ),
  rvxd(
    "silvershop-reports",
    "silvershop/reports",
    "Catalog and order hygiene reports for SilverShop, shown in the CMS Reports section."
  ),
  rvxd(
    "silvershop-reviews",
    "silvershop/reviews",
    "Product and shop reviews with star ratings, moderation, verified purchases and aggregate rating (JSON-LD) for SilverShop."
  ),
  rvxd(
    "silvershop-search",
    "silvershop/search",
    "Faceted product search & navigation for SilverShop: a search results page, a pluggable search backend (DB default), and a facet framework that modules (brands, reviews, category-index, stock) plug their own facets into."
  ),
  rvxd(
    "silvershop-search-meilisearch",
    "silvershop/search-meilisearch",
    "Meilisearch engine adapter for silvershop/search: typo-tolerant, relevance-ranked product search via a self-hosted Meilisearch."
  ),
  rvxd(
    "silvershop-seo",
    "silvershop/seo",
    "Centralised SEO for SilverShop (CMS 6): per-page meta (canonical, robots, OpenGraph, Twitter), one coherent JSON-LD @graph assembled from pluggable structured-data providers, plus an XML sitemap and robots.txt."
  ),
  rvxd(
    "silvershop-shipping-labels",
    "silvershop/shipping-labels",
    "Carrier-connected shipping label generation for SilverShop: a pluggable provider layer (Manual, MyParcel, …) with single-label creation and printing from the CMS."
  ),
  rvxd(
    "silvershop-shipping-myparcel",
    "silvershop/shipping-myparcel",
    "MyParcel shipping-label provider for silvershop/shipping-labels — creates carrier labels (PostNL; carrier-extensible) with tracking, from an order."
  ),
  rvxd(
    "silvershop-store-profile",
    "silvershop/store-profile",
    "Central shop identity for SilverShop: name, legal name, VAT number, contact details, logo and a structured store address, shared by invoicing, shipping labels and other modules."
  ),
  rvxd(
    "silvershop-usp",
    "silvershop/usp",
    "CMS-managed USPs, trust signals and an announcement/promo bar for SilverStripe. Works on any site; shop-specific placements (PDP / cart / checkout) light up when silvershop/core is present."
  ),
  rvxd(
    "silvershop-vat-compliance",
    "silvershop/vat-compliance",
    "VAT compliance layer for SilverShop (EU first). v1: tax shipping at a configurable rate. Builds on core's TaxClass; integrates with silvershop/invoicing's per-rate VAT breakdown when present."
  ),
  rvxd(
    "silvershop-wishlist",
    "silvershop/wishlist",
    "Member wishlists for SilverShop: save products and variations for later, manage them in the account area, and move them to the cart."
  ),
];
