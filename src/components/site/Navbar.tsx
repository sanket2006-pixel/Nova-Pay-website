import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { toast } from "sonner";

const links = [
  { label: "Home", id: "home" },
  { label: "Payments", id: "payments" },
  { label: "Pricing", id: "pricing" },
  { label: "Developers", id: "developers" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled ? "glass shadow-glow" : "bg-transparent"
        }`}
      >
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-1 text-xl font-bold tracking-tight"
        >
          <span className="text-foreground">pay</span>
          <span className="text-primary">now.</span>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="relative rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                />
              )}
              <span className={active === l.id ? "text-primary" : ""}>{l.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton
            variant="ghost"
            className="!px-5 !py-2 text-sm"
            onClick={() => {
              toast.success("Welcome to paynow!", {
                description: "Check your inbox for your activation link.",
              });
            }}
          >
            Sign Up
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-border bg-secondary/40 p-2 md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 mx-4 flex w-[calc(100%-2rem)] flex-col gap-1 rounded-3xl p-4 md:hidden"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                scrollTo(l.id);
                setOpen(false);
              }}
              className="rounded-2xl px-4 py-3 text-left text-sm text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
