import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check } from "lucide-react";
import { Tilt3D } from "./Tilt3D";
// MagneticButton not used here directly
import { toast } from "sonner";

const tiersData = {
  monthly: [
    { name: "Starter", price: "1.9%", suffix: "+ 20¢ per txn", desc: "For early-stage teams testing the waters.", features: ["Unlimited test mode", "Hosted checkout", "Email support", "Standard payouts"] },
    { name: "Growth", price: "1.4%", suffix: "+ 15¢ per txn", desc: "Most popular for scaling startups.", features: ["Everything in Starter", "Instant payouts", "Fraud AI included", "Priority support", "Multi-currency"], highlight: true },
    { name: "Enterprise", price: "Custom", suffix: "volume pricing", desc: "For teams processing $10M+ monthly.", features: ["Dedicated infra", "Custom contracts", "24/7 phone support", "On-prem option", "SLAs"] },
  ],
  annual: [
    { name: "Starter", price: "1.6%", suffix: "+ 18¢ per txn", desc: "Save 15% with annual billing.", features: ["Unlimited test mode", "Hosted checkout", "Email support", "Standard payouts"] },
    { name: "Growth", price: "1.1%", suffix: "+ 12¢ per txn", desc: "Best value for scaling teams.", features: ["Everything in Starter", "Instant payouts", "Fraud AI included", "Priority support", "Multi-currency"], highlight: true },
    { name: "Enterprise", price: "Custom", suffix: "volume pricing", desc: "For teams processing $10M+ monthly.", features: ["Dedicated infra", "Custom contracts", "24/7 phone support", "On-prem option", "SLAs"] },
  ],
};

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const tiers = tiersData[billing];

  return (
    <section id="pricing" className="relative py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Pricing that scales <span className="text-primary">with you</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            No setup fees. No monthly minimums. Pay only for successful transactions.
          </p>

          <div className="mx-auto mt-8 inline-flex rounded-full border border-border bg-secondary/40 p-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="relative rounded-full px-6 py-2 text-sm font-medium capitalize transition-colors"
              >
                {billing === b && (
                  <motion.span
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${billing === b ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {b}
                  {b === "annual" && <span className="ml-2 text-xs opacity-80">−15%</span>}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3" style={{ perspective: 1400 }}>
          <AnimatePresence mode="wait">
            {tiers.map((t, i) => (
              <motion.div
                key={`${billing}-${t.name}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Tilt3D intensity={8} className="group h-full">
                  <div
                    className={`relative h-full overflow-hidden rounded-3xl border p-8 backdrop-blur transition-all duration-500 ${
                      t.highlight
                        ? "border-primary/60 bg-card shadow-glow"
                        : "border-border bg-card/40 hover:border-primary/40"
                    }`}
                  >
                    {t.highlight && (
                      <div className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Popular
                      </div>
                    )}
                    <h3 style={{ transform: "translateZ(20px)" }} className="text-lg font-medium text-muted-foreground">
                      {t.name}
                    </h3>
                    <div style={{ transform: "translateZ(40px)" }} className="mt-4 flex items-baseline gap-2">
                      <span className="text-5xl font-bold">{t.price}</span>
                      <span className="text-sm text-muted-foreground">{t.suffix}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
                    <ul className="mt-8 space-y-3">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() =>
                        toast.success(`${t.name} plan selected`, {
                          description:
                            t.name === "Enterprise"
                              ? "Our team will reach out within 24 hours."
                              : "Redirecting to onboarding…",
                        })
                      }
                      className={`mt-8 w-full rounded-full py-3 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        t.highlight
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-border bg-secondary/40 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {t.name === "Enterprise" ? "Contact sales" : "Get started"}
                    </button>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


