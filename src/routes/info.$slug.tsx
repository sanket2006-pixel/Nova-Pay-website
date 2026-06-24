import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { infoPages } from "@/lib/info-content";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/info/$slug")({
  loader: ({ params }) => {
    const page = infoPages[params.slug];
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.page.title} — paynow` },
          { name: "description", content: loaderData.page.tagline },
          { property: "og:title", content: `${loaderData.page.title} — paynow` },
          { property: "og:description", content: loaderData.page.tagline },
        ]
      : [],
  }),
  component: InfoPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          ← Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p>{error.message}</p>
    </div>
  ),
});

function InfoPage() {
  const { page } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="relative pt-32">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] radial-glow opacity-60" />
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-30" />

        <section className="container mx-auto max-w-5xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-10 text-xs uppercase tracking-[0.2em] text-primary"
          >
            {page.category}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
          >
            {page.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-xl text-gradient"
          >
            {page.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground"
          >
            {page.description}
          </motion.p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {page.sections.map((s: typeof page.sections[number], i: number) => (
              <motion.div
                key={s.heading}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass group relative overflow-hidden rounded-2xl border border-border/60 p-7 transition-colors hover:border-primary/40"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--x,50%)_var(--y,0%),hsl(var(--primary)/0.15),transparent_60%)]" />
                <h3 className="text-xl font-semibold">{s.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                {s.bullets && (
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b: string) => (
                      <li key={b} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 flex flex-col items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-8 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold">Ready to ship?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create an account in minutes. No credit card required.
              </p>
            </div>
            <Link to="/">
              <Button size="lg" className="group">
                Get started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
