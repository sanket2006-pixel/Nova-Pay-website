import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Features } from "@/components/site/Features";
import { Showcase } from "@/components/site/Showcase";
import { Developers } from "@/components/site/Developers";
import { Pricing } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Cursor } from "@/components/site/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "paynow — Payments infrastructure for ambitious teams" },
      {
        name: "description",
        content:
          "Accept payments in 135+ currencies with instant settlements, AI fraud defense and developer-first APIs. The modern alternative to Stripe and Razorpay.",
      },
      { property: "og:title", content: "paynow — Business payments made easy and secure" },
      {
        property: "og:description",
        content: "Modern payments infrastructure with instant settlements and fraud AI.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Showcase />
      <Developers />
      <Pricing />
      <CTA />
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </main>
  );
}
