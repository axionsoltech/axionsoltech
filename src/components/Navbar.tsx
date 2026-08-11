import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/portfolio' },
  { label: 'Product', to: '/product' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle scroll state for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
        className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-500 ${
          isScrolled ? 'top-4 sm:top-6 px-4' : 'top-0 py-6 sm:py-10'
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'w-full max-w-4xl bg-surface/85 backdrop-blur-xl border border-border-strong rounded-full px-6 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]'
              : 'w-[80%] max-w-7xl bg-transparent border-transparent px-0 py-0'
          }`}
        >
          <Link to="/" onClick={() => setMobileOpen(false)} className="shrink-0 flex items-center gap-2">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-text-primary bg-white/5' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white btn-glow transition-all"
          >
            Let's talk
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-text-primary p-2 rounded-full bg-surface-hover/50 hover:bg-surface-hover transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-2xl md:hidden pt-28 px-6 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-3xl font-display font-medium tracking-tight ${
                        isActive ? 'text-text-primary' : 'text-text-secondary'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white btn-glow"
              >
                Start a project <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
