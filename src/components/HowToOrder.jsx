import { FaWhatsapp } from "react-icons/fa";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import { Reveal, SectionHeading } from "./ui.jsx";

const STEPS = [
  {
    icon: FiShoppingBag,
    title: "Pick your plates",
    text: "Tap “Add to order” on anything that looks good. Your order stays saved on this device.",
  },
  {
    icon: FaWhatsapp,
    title: "Send it on WhatsApp",
    text: "One tap writes the message for you. Add your name and how much pepper you can take.",
  },
  {
    icon: FiCheckCircle,
    title: "We confirm & cook",
    text: "We reply with the total and pickup time. Then we cook it fresh for you on Sunday.",
  },
];

export default function HowToOrder() {
  return (
    <section className="bg-ivory-2 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading center eyebrow="How ordering works" title="Three taps to a full belly." />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.12} className="relative rounded-3xl bg-cream p-8 shadow-sm">
              <span className="absolute right-6 top-4 font-display text-6xl font-black text-cocoa/5">{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paprika/10 text-2xl text-paprika">
                <s.icon />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-cocoa">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
