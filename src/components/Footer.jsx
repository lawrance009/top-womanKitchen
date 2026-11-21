import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { NAV_LINKS, SITE } from "../data/site.js";
import { generalMessage, waLink } from "../lib/whatsapp.js";
import { Logo } from "./Navbar.jsx";

export default function Footer() {
  const socials = [
    { href: SITE.socials.facebook, icon: FaFacebook, label: "Facebook" },
    { href: SITE.socials.instagram, icon: FaInstagram, label: "Instagram" },
    { href: waLink(generalMessage()), icon: FaWhatsapp, label: "WhatsApp" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-cocoa pt-20 pb-28 text-ivory sm:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm leading-relaxed text-ivory/60">
              Real Liberian food in {SITE.region}. Cooked from scratch, shared with everyone.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-ivory/10 text-lg transition hover:bg-paprika"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-millet">Explore</h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ivory/70 hover:text-ivory">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-millet">Find us</h4>
            <ul className="mt-4 space-y-2 text-ivory/70">
              <li>{SITE.address}</li>
              <li><a href={SITE.phoneHref} className="hover:text-ivory">{SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-ivory">{SITE.email}</a></li>
              <li>{SITE.serving}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-ivory/10 pt-6 text-sm text-ivory/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Built and designed by NexSolve X.</p>
        </div>
      </div>
    </footer>
  );
}
