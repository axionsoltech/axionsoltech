import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Logo } from './Logo';
import { GithubIcon, LinkedinIcon, XIcon } from './BrandIcons';
import { SERVICES } from '../data/services';

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Work', to: '/portfolio' },
  { label: 'Our Product', to: '/product' },
  { label: 'Contact', to: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

const SOCIALS = [
  { icon: XIcon, label: 'X (Twitter)', href: '#' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { icon: GithubIcon, label: 'GitHub', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-border relative border-t">
      <div className="mx-auto w-[80%] max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-14 grid grid-cols-2 gap-10 sm:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="text-text-secondary mt-6 max-w-sm text-base leading-relaxed">
              Software, cloud, and AI engineering for teams who need to move fast without breaking
              things. Remote-first, working with teams worldwide.
            </p>
            <a
              href="mailto:hello@axionsoltech.com"
              className="text-text-muted hover:text-accent-soft mt-6 inline-flex items-center gap-3 font-mono text-sm transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              hello@axionsoltech.com
            </a>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-text-secondary hover:text-accent-soft flex h-9 w-9 items-center justify-center transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-text-muted mb-6 font-mono text-xs tracking-widest uppercase">
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-base transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-text-muted mb-6 font-mono text-xs tracking-widest uppercase">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-text-secondary text-base transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-text-muted mb-6 font-mono text-xs tracking-widest uppercase">
              Legal
            </p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-text-secondary text-base transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border text-text-muted flex flex-col items-center justify-between gap-4 border-t pt-8 font-mono text-sm sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Axion Sol Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
