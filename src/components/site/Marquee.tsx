import { motion } from "motion/react";

const brands = ["VISA", "MASTERCARD", "AMEX", "APPLE PAY", "GOOGLE PAY", "PAYPAL", "STRIPE", "UPI", "KLARNA", "AFTERPAY"];

export function Marquee() {
  return (
    <section className="relative border-y border-border py-10">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...brands, ...brands].map((b, i) => (
            <span key={i} className="text-2xl font-bold tracking-widest text-muted-foreground/60">
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
