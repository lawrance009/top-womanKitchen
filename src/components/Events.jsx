import { FaWhatsapp } from "react-icons/fa";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { EVENTS } from "../data/events.js";
import { SITE } from "../data/site.js";
import { waLink } from "../lib/whatsapp.js";
import { Reveal, SectionHeading } from "./ui.jsx";

const DAY_MS = 24 * 60 * 60 * 1000;

function parseDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(iso) {
  return parseDate(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function daysUntil(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((parseDate(iso) - today) / DAY_MS);
}

function UpcomingEvent({ ev }) {
  const days = daysUntil(ev.date);
  const when = days === 0 ? "Today!" : days === 1 ? "Tomorrow" : `In ${days} days`;

  return (
    <Reveal className="mt-14 grid overflow-hidden rounded-[2rem] bg-cocoa-2 ring-1 ring-ivory/10 lg:grid-cols-[1fr_1.2fr]">
      {ev.image && <img src={ev.image} alt={`${ev.title} flyer`} loading="lazy" className="h-full max-h-[34rem] w-full object-cover" />}
      <div className="p-8 sm:p-12">
        <span className="inline-block rounded-full bg-millet px-4 py-1 text-sm font-bold text-cocoa">{when}</span>
        <h3 className="mt-5 font-display text-4xl font-bold leading-tight">{ev.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-ivory/75">{ev.description}</p>
        <ul className="mt-6 space-y-2 text-ivory/85">
          <li className="flex items-center gap-3"><FiCalendar className="text-millet" /> {formatDate(ev.date)}</li>
          <li className="flex items-center gap-3"><FiClock className="text-millet" /> {ev.time}</li>
          <li className="flex items-center gap-3"><FiMapPin className="text-millet" /> {ev.venue}</li>
        </ul>
        {ev.highlights?.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {ev.highlights.map((h) => (
              <li key={h} className="rounded-full bg-ivory/10 px-4 py-1.5 text-sm">{h}</li>
            ))}
          </ul>
        )}
        <a
          href={waLink(`Hello ${SITE.name} 👋 I'm coming to "${ev.title}" on ${formatDate(ev.date)}!`)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-paprika px-6 py-3.5 font-semibold text-white transition hover:bg-paprika-dark"
        >
          <FaWhatsapp /> I'm coming
        </a>
      </div>
    </Reveal>
  );
}

export default function Events() {
  const sorted = [...EVENTS].sort((a, b) => parseDate(a.date) - parseDate(b.date));
  const upcoming = sorted.filter((e) => daysUntil(e.date) >= 0);
  const past = sorted.filter((e) => daysUntil(e.date) < 0).reverse();

  return (
    <section id="events" className="bg-cocoa py-24 text-ivory sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="Events"
          title="More than a meal."
          intro="Food, ludo, card games, loud jokes and friendly city battles. Our gatherings are open to everyone."
        />

        {upcoming.length > 0 ? (
          upcoming.map((ev) => <UpcomingEvent key={ev.id} ev={ev} />)
        ) : (
          <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-cocoa-2 p-8 ring-1 ring-ivory/10 sm:flex-row sm:items-center sm:p-12">
            <div>
              <h3 className="font-display text-3xl font-bold">The next gathering is cooking.</h3>
              <p className="mt-2 text-ivory/70">Message us on WhatsApp and we'll tell you when it's on.</p>
            </div>
            <a
              href={waLink(`Hello ${SITE.name} 👋 When is the next gathering?`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paprika px-6 py-3.5 font-semibold text-white transition hover:bg-paprika-dark"
            >
              <FaWhatsapp /> Keep me posted
            </a>
          </Reveal>
        )}

        {past.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-ivory/50">Past gatherings</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((ev, i) => (
                <Reveal key={ev.id} delay={i * 0.08} className="overflow-hidden rounded-3xl bg-cocoa-2 ring-1 ring-ivory/10">
                  {ev.image && <img src={ev.image} alt={`${ev.title} flyer`} loading="lazy" className="aspect-[4/3] w-full object-cover object-top opacity-80" />}
                  <div className="p-6">
                    <p className="text-sm text-millet">{formatDate(ev.date)}</p>
                    <h4 className="mt-1 font-display text-xl font-bold">{ev.title}</h4>
                    <p className="mt-2 text-sm text-ivory/65">{ev.venue}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
