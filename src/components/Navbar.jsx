import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiShoppingBag, FiX } from "react-icons/fi";
import { NAV_LINKS } from "../data/site.js";
import { useOrder } from "../context/OrderContext.jsx";

export function Logo({ light = false }) {
  return (
    <a href="#top" className="group flex items-baseline gap-1.5 leading-none">
      <span className={`font-display text-2xl font-black tracking-tight ${light ? "text-ivory" : "text-cocoa"}`}>
        TopWoman's
      </span>
      <span className="font-display text-2xl font-medium italic text-paprika">Kitchen</span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, open } = useOrder();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        solid ? "bg-ivory/90 shadow-[0_8px_30px_rgba(43,27,20,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo light={!solid} />

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-paprika ${
                  solid ? "text-ink" : "text-ivory/85"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className="relative inline-flex items-center gap-2 rounded-full bg-paprika px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-paprika/25 transition hover:bg-paprika-dark"
          >
            <FiShoppingBag className="text-base" />
            <span className="hidden sm:inline">Your order</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="grid h-5 min-w-5 place-items-center rounded-full bg-millet px-1 text-xs font-bold text-cocoa"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`grid h-11 w-11 place-items-center rounded-full text-2xl lg:hidden ${
              solid ? "text-cocoa" : "text-ivory"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cocoa/10 bg-ivory lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-display text-2xl font-bold text-cocoa"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
