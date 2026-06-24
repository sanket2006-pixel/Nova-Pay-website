import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MagneticButton } from "./MagneticButton";

export function CTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're on the list!", {
        description: `We'll send onboarding info to ${email}.`,
      });
    }, 900);
  }

  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-card to-background p-12 text-center md:p-20"
        >
          <div className="absolute inset-0 -z-10 opacity-60">
            <motion.div
              animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl"
            />
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            Start accepting <span className="text-gradient">payments today.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Go live in under 10 minutes. No contracts. No hidden fees. Just clean, modern infrastructure.
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-12 w-full rounded-full border border-border bg-secondary/40 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <MagneticButton variant="primary" type="submit" className="!py-3">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Joining…
                </>
              ) : (
                <>
                  Get early access <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </MagneticButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
