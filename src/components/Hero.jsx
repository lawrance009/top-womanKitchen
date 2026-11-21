import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { generalMessage, waLink } from "../lib/whatsapp.js";

const ease = [0.22, 0.61, 0.36, 1];

// The table, seen from above. Each plate is cropped by the edge of the screen,
// like a real spread. Mobile sizes first, desktop (lg) after.
const PLATES = [
  {
    src: "/images/palm-butter.webp",
    alt: "Palm butter with crab",
    rotate: 8,
    className: "w-[48vw] -right-[14vw] top-[76px] lg:w-[31vw] lg:max-w-[36rem] lg:-right-[5vw] lg:top-[9%]",
  },
  {
    src: "/images/jollof.webp",
    alt: "Liberian jollof rice",
    rotate: -10,
    className: "w-[36vw] -left-[12vw] top-[96px] lg:w-[19vw] lg:max-w-[22rem] lg:-left-[3vw] lg:top-[13%]",
  },
  {
    src: "/images/pepper-soup.webp",
    alt: "Pepper soup",
    rotate: 14,
    className: "w-[40vw] -left-[8vw] -bottom-[8vw] lg:w-[17vw] lg:max-w-[20rem] lg:left-[8vw] lg:-bottom-[6vw]",
  },
  {
    src: "/images/fish-plantain.webp",
    alt: "Grilled fish with plantain",
    rotate: -6,
    className: "w-[46vw] -right-[10vw] -bottom-[12vw] lg:w-[21vw] lg:max-w-[25rem] lg:right-[10vw] lg:-bottom-[8vw]",
  },
];

function Plate({ src, alt, rotate, className, index }) {
  return (
    <motion.figure
      className={`absolute aspect-square overflow-hidden rounded-full border-[clamp(6px,0.75vw,12px)] border-ivory bg-ivory shadow-[0_40px_70px_-25px_rgba(0,0,0,0.75)] ${className}`}
      initial={{ opacity: 0, scale: 1.18, rotate: rotate - 24 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{
        opacity: { duration: 0.35, delay: 0.15 + index * 0.14 },
        default: { type: "spring", stiffness: 90, damping: 16, delay: 0.15 + index * 0.14 },
      }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" fetchPriority={index === 0 ? "high" : "auto"} />
    </motion.figure>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-cocoa text-ivory">
      {PLATES.map((p, i) => (
        <Plate key={p.src} index={i} {...p} />
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[46rem] flex-col items-center justify-center px-5 pt-[calc(48vw+6rem)] pb-[calc(38vw+2rem)] text-center sm:px-8 lg:px-0 lg:py-32">
        <motion.h1
          className="font-display text-[clamp(3rem,6.6vw,6.75rem)] leading-[0.95] font-black tracking-[-0.025em] text-balance"
          style={{ fontVariationSettings: '"SOFT" 60, "opsz" 144' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
        >
          Liberian food, cooked like home.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-[32rem] text-lg leading-relaxed text-ivory/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Tell TopWoman what you're craving, any day of the week, and she'll cook it fresh for you. One
          spoon and your tongue starts dancing, your belly says thank you, and you're already planning the
          next plate.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
        >
          <a
            href={waLink(generalMessage())}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-paprika px-7 py-3.5 font-semibold text-white transition-colors hover:bg-paprika-dark focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-millet"
          >
            <FaWhatsapp className="text-xl" aria-hidden="true" /> Order on WhatsApp
          </a>
          <a
            href="#menu"
            className="inline-flex min-h-13 items-center rounded-full border-2 border-ivory/30 px-7 py-3.5 font-semibold transition-colors hover:border-ivory hover:bg-ivory hover:text-cocoa focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-millet"
          >
            See the menu
          </a>
        </motion.div>
      </div>
    </section>
  );
}
