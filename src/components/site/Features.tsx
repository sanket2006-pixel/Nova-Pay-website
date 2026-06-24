import { motion } from "motion/react";
import { Zap, Shield, Globe, CreditCard, BarChart3, Code2 } from "lucide-react";
import { Tilt3D } from "./Tilt3D";

const features = [
  { icon: Zap, title: "Instant Settlements", desc: "Funds in your account within minutes, not days. Real-time rails across 40+ countries." },
  { icon: Shield, title: "Fraud Defense AI", desc: "Adaptive ML models block 99.2% of fraud before it reaches checkout." },
  { icon: Globe, title: "Global Coverage", desc: "Accept 135+ currencies and 40+ local payment methods out of the box." },
  { icon: CreditCard, title: "One-tap Checkout", desc: "Reduce friction with saved cards, wallets, and biometric authentication." },
  { icon: BarChart3, title: "Live Analytics", desc: "Track conversion, revenue and cohorts with sub-second dashboards." },
  { icon: Code2, title: "Developer First", desc: "Clean APIs, idempotent webhooks and SDKs for every stack you love." },
];

export function Features() {
  return (
    <section id="payments" className="relative py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs uppercase tracking-widest text-primary">
            Why paynow
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            A payments stack built for <span className="text-gradient">the next decade</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every primitive your business needs — from authorization to reconciliation — engineered for speed.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              <Tilt3D className="group h-full">
                <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur transition-all duration-500 group-hover:border-primary/50 group-hover:bg-card/80">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/15 group-hover:to-accent/10 group-hover:opacity-100" />
                  <div
                    style={{ transform: "translateZ(40px)" }}
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow"
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 style={{ transform: "translateZ(30px)" }} className="text-xl font-semibold">
                    {f.title}
                  </h3>
                  <p style={{ transform: "translateZ(20px)" }} className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
