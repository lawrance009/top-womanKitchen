import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { SITE } from "../data/site.js";
import { generalMessage, waLink } from "../lib/whatsapp.js";
import { Reveal, SectionHeading } from "./ui.jsx";

export default function Visit() {
  const rows = [
    { icon: FiMapPin, label: "Where", value: SITE.address },
    { icon: FiClock, label: "When", value: `${SITE.serving}. Order ahead on WhatsApp.` },
    { icon: FiPhone, label: "Call", value: SITE.phoneDisplay, href: SITE.phoneHref },
    { icon: FiMail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <section id="visit" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Visit & contact" title="Come hungry. Leave like family." />
          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-6">
              {rows.map((r) => (
                <div key={r.label} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-paprika/10 text-xl text-paprika">
                    <r.icon />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{r.label}</dt>
                    <dd className="mt-1 text-lg font-medium text-cocoa">
                      {r.href ? <a href={r.href} className="hover:text-paprika">{r.value}</a> : r.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <a
              href={waLink(generalMessage())}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white shadow-lg shadow-[#25D366]/30 transition hover:brightness-95"
            >
              <FaWhatsapp className="text-xl" /> Chat with us on WhatsApp
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-h-[22rem] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-cocoa/10">
          <iframe
            title="Map of Gönyeli"
            src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
            className="h-full min-h-[22rem] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
