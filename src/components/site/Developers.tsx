import { motion } from "motion/react";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const snippets = {
  node: `import { Paynow } from "paynow";

const paynow = new Paynow(process.env.PAYNOW_KEY);

await paynow.charges.create({
  amount: 4999,
  currency: "usd",
  source: "tok_visa",
  description: "Premium subscription",
});`,
  python: `import paynow

paynow.api_key = os.environ["PAYNOW_KEY"]

paynow.Charge.create(
    amount=4999,
    currency="usd",
    source="tok_visa",
    description="Premium subscription",
)`,
  curl: `curl https://api.paynow.dev/v1/charges \\
  -u sk_live_xxx: \\
  -d amount=4999 \\
  -d currency=usd \\
  -d source=tok_visa \\
  -d description="Premium subscription"`,
};

type Lang = keyof typeof snippets;

export function Developers() {
  const [lang, setLang] = useState<Lang>("node");
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(snippets[lang]);
    setCopied(true);
    toast.success("Snippet copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section id="developers" className="relative py-32">
      <div className="container mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs uppercase tracking-widest text-primary">
            <Terminal className="h-3 w-3" /> Developers
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ship payments in <span className="text-gradient">7 lines of code</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            First-class SDKs for Node, Python, Go, Ruby, PHP and Java. Typed, idempotent,
            and predictable — the way developers expect modern APIs to feel.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {["Idempotent webhooks", "Test mode with realistic data", "OpenAPI 3.1 spec", "Sandboxed playground"].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-primary opacity-30 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur">
            <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-3">
              <div className="flex gap-1">
                {(Object.keys(snippets) as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`relative rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      lang === l ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {lang === l && (
                      <motion.span
                        layoutId="code-tab"
                        className="absolute inset-0 -z-10 rounded-md bg-primary/15"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-foreground/90">
              <code>{snippets[lang]}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
