import { AnimatePresence, motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useOrder } from "../context/OrderContext.jsx";
import { formatPrice } from "../lib/whatsapp.js";

// `ref` is passed by AnimatePresence (popLayout mode); React 19 hands it over as a normal prop.
export default function MenuCard({ dish, ref }) {
  const { qtyOf, add, remove } = useOrder();
  const qty = qtyOf(dish.id);
  const price = formatPrice(dish.price);

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-cream shadow-[0_10px_30px_rgba(43,27,20,0.08)] ring-1 ring-cocoa/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {dish.tags.length > 0 && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {dish.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full px-3 py-1 text-xs font-semibold shadow ${
                  t === "Spicy" ? "bg-paprika text-white" : "bg-ivory/95 text-cocoa"
                }`}
              >
                {t === "Spicy" ? "🌶 Spicy" : t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight font-bold text-cocoa">{dish.name}</h3>
          {price && <span className="font-display text-xl font-bold text-paprika">{price}</span>}
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{dish.description}</p>
        <p className="mt-3 font-display text-[15px] italic text-paprika-dark">“{dish.tagline}”</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-xs font-medium uppercase tracking-wider text-muted/80">
            {price ? "Per plate" : "Price on WhatsApp"}
          </span>

          <AnimatePresence mode="wait" initial={false}>
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => add(dish.id)}
                className="inline-flex items-center gap-2 rounded-full bg-cocoa px-5 py-2.5 text-sm font-semibold text-ivory transition hover:bg-paprika"
              >
                <FiPlus /> Add to order
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-1 rounded-full bg-paprika p-1 text-white"
              >
                <button
                  onClick={() => remove(dish.id)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20"
                  aria-label={`One less ${dish.name}`}
                >
                  <FiMinus />
                </button>
                <span className="min-w-6 text-center text-sm font-bold">{qty}</span>
                <button
                  onClick={() => add(dish.id)}
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20"
                  aria-label={`One more ${dish.name}`}
                >
                  <FiPlus />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
