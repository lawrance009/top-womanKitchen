import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { MENU } from "../data/menu.js";
import { generalMessage, waLink } from "../lib/whatsapp.js";

const ease = [0.22, 0.61, 0.36, 1];

const PHOTOS = [
  { src: "/images/palm-butter.webp", alt: "Palm butter with crab and meat", className: "left-[6%] top-[4%] w-[52%] -rotate-6 z-20" },
  { src: "/images/dry-rice.webp", alt: "TopWoman dry rice with fish and chicken", className: "right-[2%] top-[14%] w-[46%] rotate-[5deg] z-10" },
  { src: "/images/fish-plantain.webp", alt: "Grilled fish with plantain", className: "left-[22%] bottom-[0%] w-[44%] rotate-[3deg] z-30" },
];

function Stamp() {
  return (
    <motion.div
      className="absolute -left-4 bottom-[18%] z-40 grid h-32 w-32 place-items-center rounded-full bg-millet text-cocoa shadow-xl sm:h-36 sm:w-36"
      initial={{ scale: 0, rotate: -40 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.9, type: "spring", stiffness: 160, damping: 14 }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 140 140"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      >
        <defs>
          <path id="stamp-circle" d="M70,70 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
        </defs>
        <text fontSize="11" fontWeight="700" letterSpacing="3" fill="currentColor">
          <textPath href="#stamp-circle">MONROVIA TO GÖNYELI · EVERY SUNDAY ·</textPath>
        </text>
      </motion.svg>
      <span className="font-display text-3xl font-black">TW</span>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photosY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-cocoa pt-28 pb-20 text-ivory sm:pt-32 lg:min-h-[100svh] lg:pb-28"
    >
      {/* warm glow */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-paprika/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full bg-millet/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: textY }}>
          <h1 className="font-display text-5xl leading-[0.98] font-black tracking-tight sm:text-6xl xl:text-7xl">
            {["Liberian food,", "cooked like"].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="block font-medium italic text-millet"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34, ease }}
            >
              home.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/75"
          >
            Palm butter, cassava leaf, jollof, pepper soup and more, made from scratch every Sunday. Whether
            you grew up on it or you're tasting it for the first time, there's a plate here for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-paprika px-7 py-4 font-semibold text-white shadow-xl shadow-paprika/30 transition hover:bg-paprika-dark"
            >
              See the menu
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink(generalMessage())}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-7 py-4 font-semibold text-ivory transition hover:border-ivory hover:bg-ivory hover:text-cocoa"
            >
              <FaWhatsapp className="text-lg" /> Order on WhatsApp
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-ivory/10 pt-6"
          >
            {[
              [`${MENU.length}`, "dishes"],
              ["Sundays", "fresh pots"],
              ["Everyone", "welcome"],
            ].map(([big, small]) => (
              <div key={small}>
                <dt className="font-display text-2xl font-bold text-ivory">{big}</dt>
                <dd className="text-sm text-ivory/55">{small}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* photo collage */}
        <motion.div style={{ y: photosY }} className="relative mx-auto aspect-[1/1.05] w-full max-w-xl">
          {PHOTOS.map((p, i) => (
            <motion.figure
              key={p.src}
              className={`absolute overflow-hidden rounded-3xl border-[6px] border-ivory bg-ivory shadow-2xl shadow-black/40 ${p.className}`}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.15, ease }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 50 }}
            >
              <img src={p.src} alt={p.alt} className="aspect-[4/5] w-full object-cover" />
            </motion.figure>
          ))}
          <Stamp />
        </motion.div>
      </div>
    </section>
  );
}
