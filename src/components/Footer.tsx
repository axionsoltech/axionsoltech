import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Logo } from "./Logo";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import { SERVICES } from "../data/services";

const COMPANY_LINKS = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/portfolio" },
  { label: "Our Product", to: "/product" },
  { label: "Contact", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

const SOCIALS = [
  { icon: XIcon, label: "X (Twitter)", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="w-[80%] max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2">
            <Logo />
            <p className="mt-6 text-base text-text-secondary max-w-sm leading-relaxed">
              Software, cloud, and AI engineering for teams who need to move
              fast without breaking things. Remote-first, working with teams
              worldwide.
            </p>
            <a
              href="mailto:hello@axionsoltech.com"
              className="mt-6 inline-flex items-center gap-3 text-sm font-mono text-text-muted hover:text-accent-soft transition-colors"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              hello@axionsoltech.com
            </a>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center text-text-secondary hover:text-accent-soft transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-6">
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-base text-text-secondary hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-6">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-base text-text-secondary hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-6">
              Legal
            </p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-base text-text-secondary hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-sm font-mono text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} Axion Sol Tech. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
