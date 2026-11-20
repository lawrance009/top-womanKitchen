import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { CATEGORIES, MENU } from "../data/menu.js";
import MenuCard from "./MenuCard.jsx";
import { SectionHeading } from "./ui.jsx";

export default function Menu() {
  const [active, setActive] = useState("all");
  const dishes = active === "all" ? MENU : MENU.filter((d) => d.category === active);

  return (
    <section id="menu" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeading
            eyebrow="The menu"
            title="Big pots, real flavour."
            intro="Everything is cooked from scratch with Liberian spices. Add what you want to your order and send it to us on WhatsApp."
          />

          <LayoutGroup id="menu-tabs">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">
              {CATEGORIES.map((c) => {
                const isActive = active === c.id;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(c.id)}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                      isActive ? "text-ivory" : "text-cocoa hover:text-paprika"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-cocoa"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {dishes.map((d) => (
              <MenuCard key={d.id} dish={d} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-12 text-center text-sm text-muted">
          Prices follow the market, so we confirm your total on WhatsApp before we cook.
        </p>
      </div>
    </section>
  );
}
