import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2, FiX } from "react-icons/fi";
import { useOrder } from "../context/OrderContext.jsx";
import { orderMessage, waLink } from "../lib/whatsapp.js";

export default function OrderDrawer() {
  const { lines, count, isOpen, close, add, remove, del, clear } = useOrder();
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  // Esc to close + lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  // A plain link (not window.open) so phone pop-up blockers can't stop it
  const waHref = waLink(orderMessage(lines, { name, note }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-cocoa/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-5">
              <h2 className="font-display text-2xl font-bold text-cocoa">
                Your order {count > 0 && <span className="text-paprika">({count})</span>}
              </h2>
              <button onClick={close} className="grid h-10 w-10 place-items-center rounded-full text-xl hover:bg-cocoa/5" aria-label="Close">
                <FiX />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-paprika/10 text-3xl text-paprika">
                  <FiShoppingBag />
                </span>
                <p className="mt-5 font-display text-2xl font-bold text-cocoa">Your plate is empty.</p>
                <p className="mt-2 text-muted">Let's fix that.</p>
                <a href="#menu" onClick={close} className="mt-6 rounded-full bg-cocoa px-6 py-3 font-semibold text-ivory hover:bg-paprika">
                  Browse the menu
                </a>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        className="flex items-center gap-4 rounded-2xl bg-cream p-3 ring-1 ring-cocoa/5"
                      >
                        <img src={l.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-cocoa">{l.name}</p>
                          <div className="mt-1.5 flex items-center gap-1">
                            <button onClick={() => remove(l.id)} className="grid h-7 w-7 place-items-center rounded-full bg-cocoa/5 hover:bg-cocoa/10" aria-label={`One less ${l.name}`}>
                              <FiMinus />
                            </button>
                            <span className="min-w-7 text-center text-sm font-bold">{l.qty}</span>
                            <button onClick={() => add(l.id)} className="grid h-7 w-7 place-items-center rounded-full bg-cocoa/5 hover:bg-cocoa/10" aria-label={`One more ${l.name}`}>
                              <FiPlus />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => del(l.id)} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-paprika/10 hover:text-paprika" aria-label={`Remove ${l.name}`}>
                          <FiTrash2 />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="space-y-3 border-t border-cocoa/10 px-6 py-5">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-cocoa/15 bg-cream px-4 py-3 outline-none focus:border-paprika"
                  />
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Anything else? (pepper level, pickup time…)"
                    className="w-full resize-none rounded-xl border border-cocoa/15 bg-cream px-4 py-3 outline-none focus:border-paprika"
                  />
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-semibold text-white shadow-lg shadow-[#25D366]/30 hover:brightness-95"
                  >
                    <FaWhatsapp className="text-xl" /> Send order on WhatsApp
                  </a>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>We'll reply with your total.</span>
                    <button onClick={clear} className="underline-offset-2 hover:text-paprika hover:underline">
                      Clear order
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// Floating "view order" pill on phones
export function MobileOrderBar() {
  const { count, open, isOpen } = useOrder();
  return (
    <AnimatePresence>
      {count > 0 && !isOpen && (
        <motion.button
          onClick={open}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-full bg-cocoa px-6 py-4 font-semibold text-ivory shadow-2xl sm:hidden"
        >
          <span className="flex items-center gap-2">
            <FiShoppingBag /> View your order
          </span>
          <span className="rounded-full bg-millet px-3 py-0.5 text-sm font-bold text-cocoa">{count}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
