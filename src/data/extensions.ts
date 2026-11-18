export type ExtensionProvider = {
  /** GitHub login — also used to resolve the avatar. */
  login: string;
  name: string;
};

export type Extension = {
  name: string;
  /** Composer package name, e.g. `silvershop-suite/wishlist`. */
  moduleKey: string;
  url: string;
  description: string;
  provider: ExtensionProvider;
};

export const PROVIDERS = {
  suite: { login: "silvershop-suite", name: "SilverShop Suite" },
} satisfies Record<string, ExtensionProvider>;

export function providerAvatarUrl(provider: ExtensionProvider, size = 64) {
  return `https://github.com/${provider.login}.png?size=${size}`;
}

function suite(repo: string, moduleKey: string, description: string): Extension {
  return {
    name: repo,
    moduleKey,
    url: `https://github.com/silvershop-suite/${repo}`,
    description,
    provider: PROVIDERS.suite,
  };
}

export const extensions: Extension[] = [
  suite(
    "silvershop-abandoned-cart",
    "silvershop-suite/abandoned-cart",
    "Abandoned-cart recovery for SilverShop: detect carts left behind, send a timed recovery-email sequence, and restore the cart from a tokenised link — with a self-contained snapshot so recovery survives cart cleanup."
  ),
  suite(
    "silvershop-address-formats",
    "silvershop-suite/address-formats",
    "Per-country address field rules for SilverShop: labels, required fields, postcode validation and formatting. Fixes per-country checkout and provides a reusable address formatter."
  ),
  suite(
    "silvershop-address-lookup",
    "silvershop-suite/address-lookup",
    "Checkout address autocomplete for SilverShop (CMS 6): a server-side lookup service behind a per-country provider seam (postcode+number lookup / typeahead suggest / validation)."
  ),
  suite(
    "silvershop-address-lookup-loqate",
    "silvershop-suite/address-lookup-loqate",
    "Loqate (GBG) Capture provider for silvershop-suite/address-lookup (CMS 6): the GLOBAL satellite connector. Resolves addresses in 250+ countries via Loqate's two-step Find -> Retrieve autocomplete, and installs itself as the registry's global `default` so every country without a regional mapping…"
  ),
  suite(
    "silvershop-address-lookup-myparcel",
    "silvershop-suite/address-lookup-myparcel",
    "MyParcel Address API provider for silvershop-suite/address-lookup (CMS 6): a satellite connector that resolves NL addresses structurally (postcode + house number -> street + city + lat/lng) and BE + other countries via free-text autocomplete, plus address validation."
  ),
  suite(
    "silvershop-address-lookup-postnl",
    "silvershop-suite/address-lookup-postnl",
    "PostNL Adrescheck provider for silvershop-suite/address-lookup (CMS 6): a satellite connector that resolves NL addresses structurally (postcode + house number -> street + city via PostNL's Dutch addresscheck) and every other country via free-text international autocomplete, over PostNL's unified…"
  ),
  suite(
    "silvershop-address-lookup-pro6pp",
    "silvershop-suite/address-lookup-pro6pp",
    "Pro6PP address provider for silvershop-suite/address-lookup (CMS 6): a satellite connector that resolves NL addresses structurally (postcode + house number -> street + settlement + municipality + province + lat/lng) via the Pro6PP v2 autocomplete API, and validates/canonicalises BE/DE/FR/LU (+…"
  ),
  suite(
    "silvershop-analytics",
    "silvershop-suite/analytics",
    "Catalog analytics for SilverShop: privacy-friendly product-view tracking and a most-viewed-products report, with a record() API that a search module can feed for search-term reports."
  ),
  suite(
    "silvershop-api",
    "silvershop-suite/api",
    "Headless REST API for SilverShop (SilverStripe CMS 6): catalog/cart/order/customer resources, token auth with scopes, pagination, pluggable resources/serializers and order webhooks. A backwards-compatible superset of core's api/v1."
  ),
  suite(
    "silvershop-api-graphql",
    "silvershop-suite/api-graphql",
    "GraphQL overlay for silvershop-suite/api (SilverStripe CMS 6): a public /graphql schema for the SilverShop catalog, cart, checkout hand-off, orders and customer self-service — reusing the REST base's token auth, scopes and serializers. Thin by design: auth middleware + a handful of resolvers + schema config."
  ),
  suite(
    "silvershop-barcodes",
    "silvershop-suite/barcodes",
    "Barcode image generation for SilverShop (CMS 6): render EAN-13, Code128 and QR codes to inline SVG or a PNG data-URI, from any code string or — guarded — from a product's GTIN stored by silvershop-suite/product-identity. For packing slips, invoices, shipping labels, PDFs and POS/scanning."
  ),
  suite(
    "silvershop-brands",
    "silvershop-suite/brands",
    "Native product brands / manufacturers for SilverShop: a Brand model, product-to-brand link, and a sales-by-brand report."
  ),
  suite(
    "silvershop-catalog-data",
    "silvershop-suite/catalog-data",
    "Shared normalised product-data mapper for SilverShop (CMS 6): a CatalogProductData value object + factory that turns a Product/Variation into channel-ready fields (feedId, price/sale, currency, stock-driven availability, images, brand, GTIN/MPN, condition, category path, stock quantity, shipping…"
  ),
  suite(
    "silvershop-category-index",
    "silvershop-suite/category-index",
    "Derived, queryable flat index of product-to-category membership (primary + ancestors + secondary) for fast recursive category filtering in SilverShop."
  ),
  suite(
    "silvershop-colors",
    "silvershop-suite/colors",
    "Product colours for SilverShop: a hex-swatch colour palette, product-level multi-colour tags, hex-valued colour variations, and a colour facet for the storefront search."
  ),
  suite(
    "silvershop-conversion-tracking",
    "silvershop-suite/conversion-tracking",
    "Ad conversion / event tracking core for SilverShop (CMS 6): a normalised ViewContent→AddToCart→InitiateCheckout→Purchase event model, an always-on GA4-shaped dataLayer emit, hard consent gating bound to silvershop-suite/cookieconsent, deterministic purchase event_id dedup, and a queued server-side…"
  ),
  suite(
    "silvershop-conversion-tracking-google",
    "silvershop-suite/conversion-tracking-google",
    "Google connector for silvershop-suite/conversion-tracking: GA4 ecommerce events (view_item / add_to_cart / begin_checkout / purchase) via gtag, a Google Ads conversion on purchase, Enhanced Conversions (hashed email, hashed client-side by Google) and Consent Mode v2 inherited from silvershop-suite/cookieconsent."
  ),
  suite(
    "silvershop-conversion-tracking-meta",
    "silvershop-suite/conversion-tracking-meta",
    "Meta (Facebook / Instagram) connector for silvershop-suite/conversion-tracking: the Meta Pixel (fbq) client events plus the Conversions API (CAPI) server-side send for Purchase, with shared event_id deduplication, SHA-256 Advanced Matching and fbp/fbc forwarding, all consent-gated."
  ),
  suite(
    "silvershop-cookieconsent",
    "silvershop-suite/cookieconsent",
    "A first-class, self-hosted consent-management platform (CMP) for SilverStripe: an accessible cookie banner + in-banner preferences centre, a server + JS consent-state API ($HasConsent), true script/tag blocking, Google Consent Mode v2 signalling and an immutable consent log."
  ),
  suite(
    "silvershop-currency-format",
    "silvershop-suite/currency-format",
    "Set the shop base currency in the CMS (Settings > Shop) and render prices locale-aware for it (ICU): correct symbol, placement, separators and decimals. A drop-in for single-currency shops that would otherwise configure currency via YAML."
  ),
  suite(
    "silvershop-decimal-quantity",
    "silvershop-suite/decimal-quantity",
    "Per-product decimal / fractional order quantities for SilverShop (CMS 6) — sell some products by weight/length/area (kg, m², m) while others stay whole-unit, in one catalogue."
  ),
  suite(
    "silvershop-downloads",
    "silvershop-suite/downloads",
    "Downloadable (digital) products for SilverShop: attach files to a product and let paying customers download them through a secure, ownership-checked link."
  ),
  suite(
    "silvershop-import",
    "silvershop-suite/import",
    "Channel-agnostic import engine for SilverShop (CMS 6): a two-phase stage→apply pipeline (upsert by SKU/GTIN, delta/scheduled sync on queuedjobs, dry-run, declarable per-field validation, field-level source-of-truth ownership, immutable run log) that thin per-system connectors (e.g."
  ),
  suite(
    "silvershop-import-excel",
    "silvershop-suite/import-excel",
    "Spreadsheet (Excel/CSV/ODS) source connector for silvershop-suite/import — reads a workbook into the import engine (upsert by SKU/GTIN, column-mapped, validated, dry-run) AND provides the export→correct→re-apply roundtrip: a result/error workbook the client fixes and re-uploads, plus a full…"
  ),
  suite(
    "silvershop-invoicing",
    "silvershop-suite/invoicing",
    "Immutable financial documents (invoices / credit memos) with overridable templates for SilverShop."
  ),
  suite(
    "silvershop-ledger",
    "silvershop-suite/ledger",
    "An immutable financial posting ledger / audit trail for SilverShop orders and payments."
  ),
  suite(
    "silvershop-newsletter",
    "silvershop-suite/newsletter",
    "Newsletter signup, marketing consent, double opt-in and queued ESP synchronisation for SilverShop. Works on any SilverStripe 6 site; checkout and order integration light up when silvershop/core is present."
  ),
  suite(
    "silvershop-newsletter-campaignmonitor",
    "silvershop-suite/newsletter-campaignmonitor",
    "Campaign Monitor ESP adapter for silvershop-suite/newsletter: syncs subscribers to a Campaign Monitor list via a thin Guzzle client, with a webhook back to the local list."
  ),
  suite(
    "silvershop-newsletter-laposta",
    "silvershop-suite/newsletter-laposta",
    "Laposta ESP adapter for silvershop-suite/newsletter: syncs subscribers to a Laposta list via a thin Guzzle client, with a webhook back to the local list."
  ),
  suite(
    "silvershop-newsletter-mailchimp",
    "silvershop-suite/newsletter-mailchimp",
    "Mailchimp ESP adapter for silvershop-suite/newsletter: syncs subscribers to a Mailchimp audience via a thin Guzzle client, with a webhook back to the local list."
  ),
  suite(
    "silvershop-order-confirmation",
    "silvershop-suite/order-confirmation",
    "One status-aware post-payment confirmation page (success / pending / failed / cancelled) for SilverShop: unifies the guest and member landing, adds opaque token guest access to an order, and a dedicated failed-payment page with retry."
  ),
  suite(
    "silvershop-product-bundles",
    "silvershop-suite/product-bundles",
    "Product bundles for SilverShop: sell a product that groups other products, with per-component quantities and automatic component stock linkage."
  ),
  suite(
    "silvershop-product-feed",
    "silvershop-suite/product-feed",
    "Channel-agnostic product-feed core for SilverShop (CMS 6): selects feed-eligible catalogue products, normalises each through silvershop-suite/catalog-data, hands them to a pluggable channel serializer (the FeedFormat / ChannelFeed registry seam), writes a static feed file atomically and regenerates…"
  ),
  suite(
    "silvershop-product-feed-channable",
    "silvershop-suite/product-feed-channable",
    "Channable (complete / raw) feed connector for silvershop-suite/product-feed (CMS 6): a flat, un-namespaced 'expose every field' XML serializer + field map that turns the shared CatalogProductData into a rich source feed Channable pulls from a stable URL and remaps itself."
  ),
  suite(
    "silvershop-product-feed-google",
    "silvershop-suite/product-feed-google",
    "Google Merchant channel connector for silvershop-suite/product-feed (CMS 6): an RSS 2.0 + g: namespace serializer and field map that turns the shared CatalogProductData into a Google Shopping product feed, plus a bundled Google product taxonomy with per-category mapping."
  ),
  suite(
    "silvershop-product-feed-meta",
    "silvershop-suite/product-feed-meta",
    "Meta (Facebook & Instagram) catalog channel connector for silvershop-suite/product-feed (CMS 6): an RSS 2.0 + g: namespace serializer and field map that turns the shared CatalogProductData into a Meta Commerce catalog feed for Facebook Shops, Instagram Shopping and Advantage+/dynamic ads."
  ),
  suite(
    "silvershop-product-gallery",
    "silvershop-suite/product-gallery",
    "Sortable media galleries for SilverShop products and variations: images plus consent-gated YouTube/Vimeo video embeds, in one sortable grid, with drag-sort + bulk upload, template accessors, and an overridable frontend include."
  ),
  suite(
    "silvershop-product-identity",
    "silvershop-suite/product-identity",
    "Product-identity master data for SilverShop (CMS 6): EAN/GTIN and MPN on Product and Variation, with a reusable GS1 check-digit validator and CMS validation. A dependency-light foundation consumed (guarded) by the product-feed, catalog-data, SEO and conversion-tracking modules."
  ),
  suite(
    "silvershop-related-products",
    "silvershop-suite/related-products",
    "Related, up-sell and cross-sell product relations for SilverShop: hand-curated links shown on the product page and in the cart."
  ),
  suite(
    "silvershop-reports",
    "silvershop-suite/reports",
    "Catalog and order hygiene reports for SilverShop, shown in the CMS Reports section."
  ),
  suite(
    "silvershop-reviews",
    "silvershop-suite/reviews",
    "Reviews with star ratings, moderation and aggregate rating (JSON-LD) for SilverStripe. Works on any site for company/website reviews; product reviews, verified purchases and order-triggered invitations light up when silvershop/core is present."
  ),
  suite(
    "silvershop-search",
    "silvershop-suite/search",
    "Faceted product search & navigation for SilverShop: a search results page, a pluggable search backend (DB default), and a facet framework that modules (brands, reviews, category-index, stock) plug their own facets into."
  ),
  suite(
    "silvershop-search-meilisearch",
    "silvershop-suite/search-meilisearch",
    "Meilisearch engine adapter for silvershop-suite/search: typo-tolerant, relevance-ranked product search via a self-hosted Meilisearch."
  ),
  suite(
    "silvershop-search-typesense",
    "silvershop-suite/search-typesense",
    "Typesense engine adapter for silvershop-suite/search: typo-tolerant, relevance-ranked product search via a self-hosted Typesense."
  ),
  suite(
    "silvershop-seo",
    "silvershop-suite/seo",
    "Centralised SEO for SilverShop (CMS 6): per-page meta (canonical, robots, OpenGraph, Twitter), one coherent JSON-LD @graph assembled from pluggable structured-data providers, plus an XML sitemap and robots.txt."
  ),
  suite(
    "silvershop-shipping-labels",
    "silvershop-suite/shipping-labels",
    "Carrier-connected shipping label generation for SilverShop: a pluggable provider layer (Manual, MyParcel, …) with single-label creation and printing from the CMS."
  ),
  suite(
    "silvershop-shipping-myparcel",
    "silvershop-suite/shipping-myparcel",
    "MyParcel shipping-label provider for silvershop-suite/shipping-labels — creates carrier labels (PostNL; carrier-extensible) with tracking, from an order."
  ),
  suite(
    "silvershop-stock-alerts",
    "silvershop-suite/stock-alerts",
    "Back-in-stock and price-drop notifications for SilverShop: customers subscribe to an out-of-stock product or variation (or watch its price) and get one tokenised, double-opt-in email the moment it is available again or the price falls."
  ),
  suite(
    "silvershop-store-profile",
    "silvershop-suite/store-profile",
    "Central shop identity for SilverShop: name, legal name, VAT number, contact details, logo and a structured store address, shared by invoicing, shipping labels and other modules."
  ),
  suite(
    "silvershop-timed-availability",
    "silvershop-suite/timed-availability",
    "Timed availability for SilverShop (SilverStripe CMS 6): an on-sale window (from/until) plus a manual always/never override on any product or category, so seasonal lines (Sinterklaas, Pasen, Moederdag, Vaderdag, Kerst) switch themselves on and off by date and can be forced instantly."
  ),
  suite(
    "silvershop-usp",
    "silvershop-suite/usp",
    "CMS-managed USPs, trust signals and an announcement/promo bar for SilverStripe. Works on any site; shop-specific placements (PDP / cart / checkout) light up when silvershop/core is present."
  ),
  suite(
    "silvershop-vat-compliance",
    "silvershop-suite/vat-compliance",
    "VAT compliance layer for SilverShop (EU first). v1: tax shipping at a configurable rate. Builds on core's TaxClass; integrates with silvershop-suite/invoicing's per-rate VAT breakdown when present."
  ),
  suite(
    "silvershop-wishlist",
    "silvershop-suite/wishlist",
    "Member wishlists for SilverShop: save products and variations for later, manage them in the account area, and move them to the cart."
  ),
  suite(
    "silvershop-withdrawal",
    "silvershop-suite/withdrawal",
    "EU/NL right-of-withdrawal (herroepingsknop) for SilverShop: a persistent, guest-capable withdrawal button available for the whole 14-day cooling-off window, a minimal no-account withdrawal form, an immediate on-screen + emailed confirmation, and a per-line exemption contract."
  ),
];
