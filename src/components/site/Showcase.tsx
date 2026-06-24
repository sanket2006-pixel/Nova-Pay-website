import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import featureOrb from "@/assets/feature-orb.png";

const stats = [
  { v: "$2.4B+", l: "Processed monthly" },
  { v: "99.99%", l: "Uptime SLA" },
  { v: "<120ms", l: "Avg auth latency" },
  { v: "40+", l: "Countries live" },
];

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} id="pricing" className="relative overflow-hidden py-32">
      <div className="container mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div style={{ y, rotate }} className="relative order-2 lg:order-1">
          <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-3xl" />
          <img
            src={featureOrb}
            alt="Iridescent flowing shape"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full drop-shadow-[0_0_120px_oklch(0.65_0.22_290/0.4)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs uppercase tracking-widest text-accent">
            Built to scale
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Engineered for <span className="text-gradient">infrastructure-grade</span> trust
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            We process billions for category leaders in fintech, SaaS, marketplaces and commerce. Battle-tested,
            PCI-DSS Level 1, SOC 2 Type II.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur"
              >
                <div className="text-3xl font-bold text-primary">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
