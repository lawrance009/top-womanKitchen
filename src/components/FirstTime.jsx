import { FiPlus, FiCheck } from "react-icons/fi";
import { GLOSSARY, MENU, STARTER_PICKS } from "../data/menu.js";
import { useOrder } from "../context/OrderContext.jsx";
import { Reveal, SectionHeading } from "./ui.jsx";

export default function FirstTime() {
  const picks = STARTER_PICKS.map((id) => MENU.find((d) => d.id === id)).filter(Boolean);
  const { qtyOf, add } = useOrder();

  return (
    <section id="first-time" className="relative overflow-hidden bg-palm py-24 text-ivory sm:py-32">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-millet/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="First time?"
          title="New to Liberian food? Start here."
          intro="You don't need to know anything about Liberia to eat well here. These three are where most first-timers start, and the little dictionary below covers the rest."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {picks.map((d, i) => {
            const inOrder = qtyOf(d.id) > 0;
            return (
              <Reveal key={d.id} delay={i * 0.1}>
                <div className="flex h-full items-center gap-5 rounded-3xl bg-palm-dark/60 p-4 ring-1 ring-ivory/10">
                  <img src={d.image} alt={d.name} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-millet">Pick {i + 1}</p>
                    <h3 className="mt-1 font-display text-xl font-bold leading-tight">{d.name}</h3>
                    <button
                      onClick={() => add(d.id)}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ivory/80 hover:text-millet"
                    >
                      {inOrder ? <FiCheck /> : <FiPlus />} {inOrder ? `In your order (${qtyOf(d.id)})` : "Add to order"}
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16">
          <h3 className="font-display text-2xl font-bold">The little dictionary</h3>
          <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="border-t border-ivory/15 pt-4">
                <dt className="font-display text-lg font-bold text-millet">{g.term}</dt>
                <dd className="mt-1 leading-relaxed text-ivory/75">{g.meaning}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
