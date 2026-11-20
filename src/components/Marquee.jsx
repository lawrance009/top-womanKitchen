import { motion } from "framer-motion";
import { MENU } from "../data/menu.js";

export default function Marquee() {
  const words = MENU.map((d) => d.name);
  const row = [...words, ...words];

  return (
    <div className="relative overflow-hidden bg-paprika py-4 text-white" aria-hidden="true">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-bold italic">
            {w}
            <span className="text-millet not-italic">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
