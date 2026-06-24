import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

type Col = { title: string; links: { label: string; slug: string }[] };

const cols: Col[] = [
  {
    title: "Product",
    links: [
      { label: "Payments", slug: "payments" },
      { label: "Checkout", slug: "checkout" },
      { label: "Billing", slug: "billing" },
      { label: "Connect", slug: "connect" },
      { label: "Terminal", slug: "terminal" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Docs", slug: "docs" },
      { label: "API Reference", slug: "api-reference" },
      { label: "SDKs", slug: "sdks" },
      { label: "Status", slug: "status" },
      { label: "Changelog", slug: "changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", slug: "about" },
      { label: "Customers", slug: "customers" },
      { label: "Careers", slug: "careers" },
      { label: "Press", slug: "press" },
      { label: "Contact", slug: "contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", slug: "privacy" },
      { label: "Terms", slug: "terms" },
      { label: "Security", slug: "security" },
      { label: "DPA", slug: "dpa" },
      { label: "Cookies", slug: "cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border bg-card/30 pb-10 pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link to="/" className="text-2xl font-bold">
              pay<span className="text-primary">now.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The payments infrastructure for ambitious teams. Built in 2026 for the way modern
              businesses move money.
            </p>
          </motion.div>

          {cols.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * (idx + 1) }}
            >
              <h4 className="mb-4 text-sm font-semibold">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.slug}>
                    <Link
                      to="/info/$slug"
                      params={{ slug: l.slug }}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1"
                    >
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 paynow. All rights reserved.</p>
          <p>Made with precision in New Delhi</p>
        </div>
      </div>
    </footer>
  );
}
