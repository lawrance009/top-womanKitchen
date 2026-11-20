import { motion } from "framer-motion";

// Fades + lifts children into view once, when scrolled to.
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-paprika ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, intro, light = false, center = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow className={light ? "text-millet" : ""}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl ${
          light ? "text-ivory" : "text-cocoa"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-ivory/75" : "text-muted"}`}>{intro}</p>
      )}
    </Reveal>
  );
}
