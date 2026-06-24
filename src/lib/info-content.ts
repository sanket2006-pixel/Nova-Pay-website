export type InfoPage = {
  slug: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  cta?: { label: string; href: string };
};

const make = (
  slug: string,
  category: string,
  title: string,
  tagline: string,
  description: string,
  sections: InfoPage["sections"],
): InfoPage => ({ slug, category, title, tagline, description, sections });

export const infoPages: Record<string, InfoPage> = {
  // PRODUCT
  payments: make(
    "payments",
    "Product",
    "Payments",
    "Accept money the modern way.",
    "A unified payments stack with global card networks, UPI, wallets, and bank transfers — all behind a single API.",
    [
      {
        heading: "Built for scale",
        body: "Process billions in volume with <120ms p95 latency. Auto-routing across acquirers maximizes authorization rates.",
        bullets: ["135+ currencies", "Smart retries", "Adaptive 3DS", "Network tokens"],
      },
      {
        heading: "Pricing that scales",
        body: "Start at 1.4% + flat fee, with custom interchange-plus pricing for enterprise volume.",
      },
    ],
  ),
  checkout: make(
    "checkout",
    "Product",
    "Checkout",
    "A conversion-obsessed checkout.",
    "Drop-in, embedded, or fully headless. One-tap checkout with stored credentials lifts conversions by up to 18%.",
    [
      {
        heading: "Frictionless flows",
        body: "Apple Pay, Google Pay, UPI Intent, Link, and saved cards detected automatically.",
        bullets: ["A/B tested layouts", "Localized in 40+ languages", "Mobile-first"],
      },
    ],
  ),
  billing: make(
    "billing",
    "Product",
    "Billing",
    "Subscriptions, usage and invoices.",
    "Recurring billing, metered usage, proration, dunning and revenue recognition — out of the box.",
    [
      {
        heading: "Revenue automation",
        body: "Smart retries recover up to 38% of failed renewals. Tax handled in 80+ regions.",
        bullets: ["Usage metering", "Trials & coupons", "Dunning", "Revenue reports"],
      },
    ],
  ),
  connect: make(
    "connect",
    "Product",
    "Connect",
    "Payments for platforms & marketplaces.",
    "Onboard sellers, split payouts, and manage KYC across borders with a single integration.",
    [
      {
        heading: "Marketplace-ready",
        body: "Express, Standard and Custom onboarding flows. Issue virtual cards to your sellers.",
        bullets: ["Multi-party payouts", "Embedded KYC", "Negative balance protection"],
      },
    ],
  ),
  terminal: make(
    "terminal",
    "Product",
    "Terminal",
    "In-person payments, unified.",
    "Pre-certified card readers and Tap to Pay on iPhone, all reconciled with your online stack.",
    [
      {
        heading: "Omnichannel by default",
        body: "Customers, refunds and reporting flow into the same dashboard as online payments.",
        bullets: ["Tap to Pay", "Bluetooth readers", "Offline mode"],
      },
    ],
  ),

  // DEVELOPERS
  docs: make(
    "docs",
    "Developers",
    "Documentation",
    "Everything you need to build.",
    "Guides, tutorials and recipes covering every product. Open-source examples for every popular stack.",
    [
      {
        heading: "Start in minutes",
        body: "Quickstarts for Node, Python, Go, Ruby, PHP and .NET. Postman collections included.",
      },
    ],
  ),
  "api-reference": make(
    "api-reference",
    "Developers",
    "API Reference",
    "A REST API designed for humans.",
    "Predictable resource-oriented URLs, JSON-encoded bodies, and verbose, helpful errors.",
    [
      {
        heading: "Stable & versioned",
        body: "Pinned versions, idempotency keys, and detailed changelogs for every release.",
        bullets: ["OpenAPI 3.1", "Webhooks", "Idempotency", "Rate-limit headers"],
      },
    ],
  ),
  sdks: make(
    "sdks",
    "Developers",
    "SDKs",
    "Native libraries for every stack.",
    "Officially-supported SDKs for server, mobile and web — including React, Swift, Kotlin and Flutter.",
    [
      {
        heading: "Type-safe & tree-shakeable",
        body: "Full TypeScript types, ESM-first, with under 12KB gzipped for the browser SDK.",
      },
    ],
  ),
  status: make(
    "status",
    "Developers",
    "System Status",
    "Real-time platform health.",
    "All systems operational. 99.99% uptime over the trailing 90 days.",
    [
      {
        heading: "Transparency",
        body: "Live metrics for every API surface and historical incident reports going back 5 years.",
      },
    ],
  ),
  changelog: make(
    "changelog",
    "Developers",
    "Changelog",
    "Shipping weekly.",
    "Every API change, SDK release, and dashboard improvement — documented.",
    [
      {
        heading: "Latest releases",
        body: "v2026.06 — Adaptive 3DS, new Tap to Pay SDK, real-time fraud signals.",
      },
    ],
  ),

  // COMPANY
  about: make(
    "about",
    "Company",
    "About paynow",
    "Money should move at the speed of software.",
    "We're building the financial infrastructure for the next decade of internet businesses.",
    [
      {
        heading: "Our mission",
        body: "Empower ambitious teams to launch, scale and monetize globally without payments friction.",
      },
      {
        heading: "By the numbers",
        body: "$2.4B+ processed · 500K+ businesses · 40+ countries · 99.99% uptime",
      },
    ],
  ),
  customers: make(
    "customers",
    "Company",
    "Customers",
    "Loved by builders worldwide.",
    "From two-person startups to public companies, teams trust paynow to power their revenue.",
    [
      {
        heading: "Featured stories",
        body: "Read how leading marketplaces, SaaS platforms and fintechs scaled with paynow.",
      },
    ],
  ),
  careers: make(
    "careers",
    "Company",
    "Careers",
    "Build the rails of the internet economy.",
    "We're hiring across engineering, design, risk and go-to-market. Remote-friendly, globally distributed.",
    [
      {
        heading: "Open roles",
        body: "30+ positions across New Delhi, London, New York and remote.",
        bullets: ["Engineering", "Product", "Design", "Risk & Compliance", "Sales"],
      },
    ],
  ),
  press: make(
    "press",
    "Company",
    "Press",
    "News & media resources.",
    "Brand assets, leadership bios, and the latest paynow news.",
    [
      {
        heading: "Media inquiries",
        body: "Reach our communications team at press@paynow.example.",
      },
    ],
  ),
  contact: make(
    "contact",
    "Company",
    "Contact",
    "We'd love to hear from you.",
    "Sales, support and partnerships — pick the right door and we'll route you to a human.",
    [
      {
        heading: "Get in touch",
        body: "Sales: sales@paynow.example · Support: help@paynow.example · Partnerships: partners@paynow.example",
      },
    ],
  ),

  // LEGAL
  privacy: make(
    "privacy",
    "Legal",
    "Privacy Policy",
    "Your data, your control.",
    "How paynow collects, processes and protects personal data across all of our services.",
    [
      {
        heading: "What we collect",
        body: "Only what's required to deliver services, prevent fraud, and meet regulatory obligations.",
      },
      {
        heading: "Your rights",
        body: "Access, export and delete your data at any time from the dashboard.",
      },
    ],
  ),
  terms: make(
    "terms",
    "Legal",
    "Terms of Service",
    "The rules of the road.",
    "The agreement between you and paynow when using our platform and APIs.",
    [
      {
        heading: "Acceptable use",
        body: "Fair, transparent guidelines that keep the platform safe for everyone.",
      },
    ],
  ),
  security: make(
    "security",
    "Legal",
    "Security",
    "Bank-grade, by default.",
    "PCI DSS Level 1, SOC 2 Type II and ISO 27001 certified. End-to-end encryption everywhere.",
    [
      {
        heading: "How we protect you",
        body: "Hardware-backed key management, continuous monitoring, and a 24/7 security operations center.",
        bullets: ["PCI DSS L1", "SOC 2 Type II", "ISO 27001", "GDPR & DPDP"],
      },
    ],
  ),
  dpa: make(
    "dpa",
    "Legal",
    "Data Processing Agreement",
    "GDPR & DPDP compliant by default.",
    "Our standard DPA covers EU, UK and Indian data protection requirements out of the box.",
    [
      {
        heading: "Sign electronically",
        body: "Available directly from your dashboard — no back-and-forth emails required.",
      },
    ],
  ),
  cookies: make(
    "cookies",
    "Legal",
    "Cookie Policy",
    "What we store on your device.",
    "We use cookies to keep you signed in, remember preferences, and measure how the product is used.",
    [
      {
        heading: "Manage preferences",
        body: "You can opt out of non-essential cookies at any time from the footer banner.",
      },
    ],
  ),
};
