import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "./ui.jsx";

// TODO: swap these for real photos of TopWoman, the kitchen and Sunday gatherings
const PHOTOS = [
  { src: "/images/spread-1.webp", alt: "A plate of kala, plantain and fried eggs", className: "col-span-2 row-span-2 aspect-[4/5]" },
  { src: "/images/spread-2.webp", alt: "Fufu with stew", className: "h-full" },
  { src: "/images/spread-3.webp", alt: "Stew with meat and fish", className: "h-full" },
];

export default function About() {
  return (
    <section id="about" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="grid grid-cols-3 gap-4">
          {PHOTOS.map((p, i) => (
            <motion.figure
              key={p.src}
              className={`overflow-hidden rounded-3xl ${p.className}`}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
            </motion.figure>
          ))}
        </div>

        <div>
          <SectionHeading eyebrow="Our story" title="From Monrovia to Gönyeli, one pot at a time." />
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                TopWoman's Kitchen started with Liberian students in North Cyprus who missed the taste of home.
                Every Sunday we cooked, laughed, played ludo and felt like family again.
              </p>
              <p>
                People kept coming back, and they brought friends: classmates, neighbours, people who had never
                heard of palm butter. Now the table is open to everyone. Come hungry, leave like family.
              </p>
            </div>
            <blockquote className="mt-10 border-l-4 border-paprika pl-6 font-display text-2xl leading-snug italic text-cocoa">
              “Every bite should feel like home, and every laugh should sound like Monrovia.”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
