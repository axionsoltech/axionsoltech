import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import {
  ArrowRight,
  Layers3,
  ShieldCheck,
  Shield,
  Lock,
  Sparkles,
  Activity,
  Users,
  Database,
  LayoutDashboard,
  Settings,
  CreditCard,
  Bell,
  MoreHorizontal,
} from 'lucide-react';

import { useDevice } from '../hooks/useDevice';

const HIGHLIGHTS = [
  {
    title: 'Multi-tenant by design',
    description: 'Run one platform for many brands without duplicating workflows.',
    icon: Layers3,
  },
  {
    title: 'Production-ready integrations',
    description: 'Connect insurer systems and customer journeys in real time.',
    icon: ShieldCheck,
  },
  {
    title: 'Built for scale',
    description: 'Support brokers, agents, and customers from a single experience.',
    icon: Sparkles,
  },
];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: 'dashboard' },
  { icon: Users, label: 'Customers', path: 'customers' },
  { icon: Settings, label: 'Settings', path: 'settings' },
];

export function OurProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useDevice();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calculate horizontal scroll for 3 screens (0 to -66.666%)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  return (
    <>
      {/* Increase height to allow scrolling through 3 screens */}
      <section ref={sectionRef} className="bg-surface relative" style={{ height: '300vh' }}>
        {/* Sticky Container */}
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden py-16 sm:py-24">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
          <div
            className="glow-orb pointer-events-none top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-40"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto flex w-[80%] max-w-7xl flex-1 flex-col">
            {/* Header Section (Fades out slightly as you scroll down) */}
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0.3]) }}
              className="mb-12 flex shrink-0 flex-col items-end justify-between gap-6 md:flex-row"
            >
              <div className="max-w-2xl">
                <p className="text-accent-soft mb-4 text-xs font-medium tracking-[0.2em] uppercase">
                  Our Product
                </p>
                <h2 className="font-display text-text-primary mb-4 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
                  We run our own <span className="text-text-secondary">software.</span>
                </h2>
                <p className="text-text-secondary hidden text-base leading-relaxed sm:block">
                  Nexus is our white-label SaaS platform. It's the clearest example of how we think:
                  practical, scalable, and built for real-world operations.
                </p>

                <a
                  href="#"
                  className="bg-accent btn-glow mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all"
                >
                  <span>View Live Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Browser Frame & Product Visual */}
            <div className="border-border-strong relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border bg-[#0B0F1A] shadow-[0_30px_100px_-20px_rgba(59,130,246,0.25)] sm:rounded-[2rem]">
              {/* Browser Header */}
              <div className="border-border-strong flex shrink-0 items-center justify-between border-b bg-[#0a0d17] px-6 py-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>

                {/* URL Bar */}
                <div className="bg-surface-light/30 mx-4 flex max-w-xl flex-1 items-center justify-center rounded-md border border-white/5 px-3 py-1.5">
                  <span className="text-text-muted flex items-center gap-2 font-mono text-xs">
                    <Lock className="text-accent-soft h-3 w-3" />
                    <span>nexus.app/{SIDEBAR_ITEMS[activeIndex].path}</span>
                  </span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <Bell className="text-text-muted h-4 w-4 cursor-pointer transition-colors hover:text-white" />
                  <div className="from-accent h-7 w-7 rounded-full border-2 border-[#0a0d17] bg-gradient-to-tr to-purple-500 ring-1 ring-white/10" />
                </div>
              </div>

              {/* Product UI Mockup */}
              <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-b-2xl border border-white/5 bg-[#0B0F1A] shadow-2xl sm:rounded-b-[2rem]">
                {/* Sidebar Mock (Static) */}
                <div className="border-border-strong z-20 hidden w-64 shrink-0 flex-col gap-8 border-r bg-[#0B0F1A] py-8 pr-6 pl-8 md:flex">
                  <div className="border-border/50 flex items-center gap-3 border-b p-4">
                    <div className="bg-accent/20 border-accent/30 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
                      <Shield className="text-accent h-4 w-4" />
                    </div>
                    <span className="font-semibold tracking-wide text-white">Nexus</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {SIDEBAR_ITEMS.map((item, i) => {
                      const isActive = activeIndex === i;
                      return (
                        <div
                          key={i}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-accent/10 text-accent border-accent/20 border shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' : 'text-text-secondary hover:bg-surface-hover/50 border border-transparent hover:text-white'}`}
                        >
                          <item.icon className="h-4 w-4" /> {item.label}
                        </div>
                      );
                    })}
                    <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-8">
                      <div className="text-text-secondary hover:bg-surface-hover/50 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-white">
                        <CreditCard className="h-4 w-4" /> Billing
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Mock (Horizontal Scroll Track) */}
                <div className="relative flex-1 overflow-hidden">
                  <motion.div
                    className="flex h-full"
                    style={{ width: '300%', x: reducedMotion ? 0 : x }}
                  >
                    {/* SCREEN 1: DASHBOARD */}
                    <div className="flex h-full w-1/3 flex-col gap-6 p-6 lg:p-8">
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
                        {[
                          { icon: Activity, val: '99.99%', label: 'Uptime', trend: '+0.01%' },
                          { icon: Users, val: '1.2M', label: 'Active Users', trend: '+12.5%' },
                          { icon: Database, val: '4.5PB', label: 'Data Processed', trend: '+4.2%' },
                        ].map((stat, i) => (
                          <div
                            key={i}
                            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04] lg:p-6"
                          >
                            <div className="absolute top-0 right-0 p-5">
                              <span className="rounded-full border border-green-400/20 bg-green-400/10 px-2 py-1 font-mono text-[10px] text-green-400">
                                {stat.trend}
                              </span>
                            </div>
                            <stat.icon className="text-accent shadow-accent h-5 w-5" />
                            <div className="mt-2">
                              <div className="font-display mb-1 text-3xl font-semibold tracking-tight text-white">
                                {stat.val}
                              </div>
                              <div className="text-text-secondary text-xs font-medium">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

                        <div className="relative z-10 mb-8 flex items-start justify-between">
                          <div>
                            <h4 className="mb-1 text-lg font-medium tracking-tight text-white">
                              System Load
                            </h4>
                            <p className="text-text-secondary text-xs">
                              Requests per minute (thousands)
                            </p>
                          </div>
                          <div className="bg-surface-hover/50 flex gap-2 rounded-lg border border-white/5 p-1">
                            <span className="text-text-muted cursor-pointer rounded bg-transparent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5">
                              1H
                            </span>
                            <span className="bg-accent/20 border-accent/30 text-accent cursor-pointer rounded border px-3 py-1.5 text-xs font-medium shadow-[0_0_10px_rgba(var(--accent),0.2)]">
                              24H
                            </span>
                            <span className="text-text-muted cursor-pointer rounded bg-transparent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5">
                              7D
                            </span>
                          </div>
                        </div>

                        <div className="relative z-10 mt-4 flex flex-1 items-end gap-3 sm:gap-6">
                          {[40, 70, 45, 90, 65, 80, 50, 100, 85, 60, 75, 45].map((h, i) => (
                            <div
                              key={i}
                              className="group/bar relative flex h-full flex-1 items-end"
                            >
                              <div className="bg-surface pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded border border-white/10 px-3 py-1.5 font-mono text-xs whitespace-nowrap text-white opacity-0 shadow-xl transition-all group-hover/bar:-translate-y-2 group-hover/bar:opacity-100">
                                {h}k reqs
                              </div>
                              <div
                                className="from-accent/10 to-accent/40 border-accent/60 group-hover/bar:to-accent/60 group-hover/bar:border-accent w-full rounded-t border-t bg-gradient-to-t shadow-[0_0_15px_rgba(var(--accent),0.1)] transition-colors group-hover/bar:shadow-[0_0_20px_rgba(var(--accent),0.4)]"
                                style={{ height: `${h}%` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 2: CUSTOMERS */}
                    <div className="flex h-full w-1/3 flex-col gap-6 p-6 lg:p-8">
                      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <h4 className="text-lg font-medium tracking-tight text-white">
                          Active Customers
                        </h4>
                        <button className="bg-accent rounded-lg px-4 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(var(--accent),0.3)]">
                          Add Customer
                        </button>
                      </div>

                      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
                        <div className="text-text-muted grid grid-cols-4 gap-4 border-b border-white/5 bg-white/[0.01] p-4 text-xs font-medium tracking-wider uppercase">
                          <div className="col-span-2">Customer</div>
                          <div>Plan</div>
                          <div>Status</div>
                        </div>
                        <div className="flex flex-col overflow-y-auto">
                          {[
                            {
                              name: 'Acme Corp',
                              email: 'contact@acme.inc',
                              plan: 'Enterprise',
                              status: 'Active',
                            },
                            {
                              name: 'Global Logistics',
                              email: 'sysadmin@globallogistics.com',
                              plan: 'Pro',
                              status: 'Active',
                            },
                            {
                              name: 'Stark Industries',
                              email: 'tony@stark.com',
                              plan: 'Enterprise',
                              status: 'Warning',
                            },
                            {
                              name: 'Wayne Enterprises',
                              email: 'it@wayne.com',
                              plan: 'Pro',
                              status: 'Active',
                            },
                            {
                              name: 'Cyberdyne',
                              email: 'root@skynet.com',
                              plan: 'Starter',
                              status: 'Error',
                            },
                          ].map((cust, i) => (
                            <div
                              key={i}
                              className="group grid cursor-pointer grid-cols-4 items-center gap-4 border-b border-white/5 p-4 transition-colors hover:bg-white/[0.02]"
                            >
                              <div className="col-span-2 flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                                  {cust.name[0]}
                                </div>
                                <div>
                                  <div className="group-hover:text-accent text-sm font-medium text-white transition-colors">
                                    {cust.name}
                                  </div>
                                  <div className="text-text-secondary text-xs">{cust.email}</div>
                                </div>
                              </div>
                              <div className="text-text-secondary text-sm">{cust.plan}</div>
                              <div className="flex items-center justify-between pr-4">
                                <span
                                  className={`rounded-full border px-2 py-1 font-mono text-[10px] ${
                                    cust.status === 'Active'
                                      ? 'border-green-400/20 bg-green-400/10 text-green-400'
                                      : cust.status === 'Warning'
                                        ? 'border-yellow-400/20 bg-yellow-400/10 text-yellow-400'
                                        : 'border-red-400/20 bg-red-400/10 text-red-400'
                                  }`}
                                >
                                  {cust.status}
                                </span>
                                <MoreHorizontal className="text-text-muted h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 3: SETTINGS */}
                    <div className="flex h-full w-1/3 flex-col gap-6 p-6 lg:p-8">
                      <div className="border-b border-white/5 pb-6">
                        <h4 className="mb-2 text-lg font-medium tracking-tight text-white">
                          Organization Settings
                        </h4>
                        <p className="text-text-secondary text-sm">
                          Manage your team and platform configuration.
                        </p>
                      </div>

                      <div className="flex flex-1 flex-col gap-6">
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                          <h5 className="mb-4 font-medium text-white">API Configuration</h5>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-white">
                                  Production Environment
                                </div>
                                <div className="text-text-secondary text-xs">
                                  Enable live traffic routing to production clusters
                                </div>
                              </div>
                              <div className="bg-accent relative h-6 w-10 rounded-full shadow-[0_0_10px_rgba(var(--accent),0.5)]">
                                <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white" />
                              </div>
                            </div>
                            <div className="my-2 h-px w-full bg-white/5" />
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-white">Auto-scaling</div>
                                <div className="text-text-secondary text-xs">
                                  Automatically provision instances during traffic spikes
                                </div>
                              </div>
                              <div className="bg-accent relative h-6 w-10 rounded-full shadow-[0_0_10px_rgba(var(--accent),0.5)]">
                                <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                          <h5 className="mb-4 font-medium text-white">Danger Zone</h5>
                          <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                            <div>
                              <div className="text-sm font-medium text-red-400">
                                Delete Organization
                              </div>
                              <div className="text-text-secondary mt-1 text-xs">
                                Permanently delete all data and configuration
                              </div>
                            </div>
                            <button className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500 hover:text-white">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights (Standard scrolling section after sticky finishes) */}
      <section className="bg-surface border-border relative z-10 border-b pt-16 pb-16 sm:pt-32 sm:pb-32">
        <div className="mx-auto w-[80%] max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="border-border bg-surface hover:bg-surface-hover rounded-2xl border p-6 transition-colors"
              >
                <Icon className="text-accent-soft mb-4 h-6 w-6" />
                <h3 className="text-text-primary mb-2 font-medium">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
