import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Star, ArrowRight, Play } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Hero3DOrb } from "./Hero3DOrb";
import { toast } from "sonner";

const word = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);


  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden pt-32">
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <motion.div style={{ y: textY, opacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur"
          >
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-muted-foreground">4.7+ overall Global rating</span>
          </motion.div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {["Business", "Payment"].map((w, i) => (
              <motion.span
                key={w}
                custom={i}
                variants={word}
                initial="hidden"
                animate="show"
                className={`mr-4 inline-block ${i === 1 ? "text-primary" : ""}`}
              >
                {w}
              </motion.span>
            ))}
            <br />
            {[
              { t: "easy", c: "text-gradient" },
              { t: "and", c: "text-foreground" },
              { t: "Secure", c: "text-primary" },
            ].map((w, i) => (
              <motion.span
                key={w.t}
                custom={i + 2}
                variants={word}
                initial="hidden"
                animate="show"
                className={`mr-4 inline-block ${w.c}`}
              >
                {w.t}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            Accept payments in 135+ currencies with a single integration. Built for ambitious teams
            ready to scale globally without the friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              variant="primary"
              onClick={() => {
                scrollTo("pricing");
                toast.success("Let's get you started", { description: "Explore our pricing plans below." });
              }}
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => scrollTo("pricing")}>
              <Play className="h-4 w-4" /> Watch Demo
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-12 border-t border-border pt-8"
          >
            <div className="flex items-center gap-6">
              <div>
                <div className="text-4xl font-bold text-primary">500K</div>
                <div className="text-sm text-muted-foreground">Worldwide Users</div>
              </div>
              <div className="flex -space-x-3">
                {["#3b82f6", "#ec4899", "#f59e0b", "#10b981"].map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.15, zIndex: 10 }}
                    className="h-12 w-12 cursor-pointer rounded-full border-2 border-background"
                    style={{ background: `linear-gradient(135deg, ${c}, oklch(0.72 0.17 160))` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={orbRef}
          style={{ y: orbY, scale: orbScale }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0 -m-12 rounded-full border border-primary/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0 -m-24 rounded-full border border-accent/15"
          />
          <Hero3DOrb />
        </motion.div>
      </div>
    </section>
  );
}
