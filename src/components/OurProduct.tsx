import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, ArrowRight, Layers3, ShieldCheck, Shield, Lock, Sparkles, Activity, Users, Database, LayoutDashboard, Settings, CreditCard, FileText, Bell, Search, CheckCircle2, MoreHorizontal } from "lucide-react";

import { useDevice } from "../hooks/useDevice";

const HIGHLIGHTS = [
  {
    title: "Multi-tenant by design",
    description: "Run one platform for many brands without duplicating workflows.",
    icon: Layers3,
  },
  {
    title: "Production-ready integrations",
    description: "Connect insurer systems and customer journeys in real time.",
    icon: ShieldCheck,
  },
  {
    title: "Built for scale",
    description: "Support brokers, agents, and customers from a single experience.",
    icon: Sparkles,
  },
];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "dashboard" },
  { icon: Users, label: "Customers", path: "customers" },
  { icon: Settings, label: "Settings", path: "settings" },
];

export function OurProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useDevice();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Calculate horizontal scroll for 3 screens (0 to -66.666%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  return (
    <>
      {/* Increase height to allow scrolling through 3 screens */}
      <section ref={sectionRef} className="relative bg-surface" style={{ height: '300vh' }}>

        {/* Sticky Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col py-16 sm:py-24">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="glow-orb w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40" aria-hidden="true" />

          <div className="relative w-[80%] max-w-7xl mx-auto flex-1 flex flex-col z-10">

            {/* Header Section (Fades out slightly as you scroll down) */}
            <motion.div
              style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0.3]) }}
              className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 shrink-0"
            >
              <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-soft mb-4">Our Product</p>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text-primary tracking-tight leading-[1.1] mb-4">
                  We run our own <span className="text-text-secondary">software.</span>
                </h2>
                <p className="text-base text-text-secondary leading-relaxed hidden sm:block">
                  Nexus is our white-label SaaS platform. It's the clearest example of how we think: practical, scalable, and built for real-world operations.
                </p>

                <a href="#" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 mt-6 text-sm font-medium text-white btn-glow transition-all">
                  <span>View Live Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Browser Frame & Product Visual */}
            <div className="relative w-full flex-1 min-h-0 rounded-2xl sm:rounded-[2rem] border border-border-strong bg-[#0B0F1A] shadow-[0_30px_100px_-20px_rgba(59,130,246,0.25)] flex flex-col overflow-hidden">

              {/* Browser Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-strong bg-[#0a0d17] shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                {/* URL Bar */}
                <div className="flex-1 mx-4 max-w-xl bg-surface-light/30 border border-white/5 rounded-md flex items-center justify-center py-1.5 px-3">
                  <span className="text-xs text-text-muted font-mono flex items-center gap-2">
                    <Lock className="w-3 h-3 text-accent-soft" />
                    <span>nexus.app/{SIDEBAR_ITEMS[activeIndex].path}</span>
                  </span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <Bell className="w-4 h-4 text-text-muted hover:text-white transition-colors cursor-pointer" />
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-accent to-purple-500 border-2 border-[#0a0d17] ring-1 ring-white/10" />
                </div>
              </div>

              {/* Product UI Mockup */}
              <div className="flex-1 min-h-0 flex overflow-hidden bg-[#0B0F1A] relative border border-white/5 shadow-2xl rounded-b-2xl sm:rounded-b-[2rem]">
              
                {/* Sidebar Mock (Static) */}
                <div className="hidden md:flex flex-col gap-8 border-r border-border-strong pr-6 pl-8 py-8 w-64 shrink-0 bg-[#0B0F1A] z-20">
                  <div className="p-4 border-b border-border/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-accent" />
                    </div>
                    <span className="font-semibold text-white tracking-wide">Nexus</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {SIDEBAR_ITEMS.map((item, i) => {
                      const isActive = activeIndex === i;
                      return (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${isActive ? 'bg-accent/10 text-accent border border-accent/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' : 'text-text-secondary hover:text-white hover:bg-surface-hover/50 border border-transparent'}`}>
                          <item.icon className="w-4 h-4" /> {item.label}
                        </div>
                      );
                    })}
                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-white hover:bg-surface-hover/50 text-sm font-medium transition-colors cursor-pointer">
                        <CreditCard className="w-4 h-4" /> Billing
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Mock (Horizontal Scroll Track) */}
                <div className="flex-1 overflow-hidden relative">
                  <motion.div
                    className="flex h-full"
                    style={{ width: "300%", x: reducedMotion ? 0 : x }}
                  >

                    {/* SCREEN 1: DASHBOARD */}
                    <div className="w-1/3 h-full p-6 lg:p-8 flex flex-col gap-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                        {[
                          { icon: Activity, val: "99.99%", label: "Uptime", trend: "+0.01%" },
                          { icon: Users, val: "1.2M", label: "Active Users", trend: "+12.5%" },
                          { icon: Database, val: "4.5PB", label: "Data Processed", trend: "+4.2%" }
                        ].map((stat, i) => (
                          <div key={i} className="p-5 lg:p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3 relative overflow-hidden group hover:bg-white/[0.04] transition-colors">
                            <div className="absolute top-0 right-0 p-5">
                              <span className="text-[10px] font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded-full">{stat.trend}</span>
                            </div>
                            <stat.icon className="w-5 h-5 text-accent shadow-accent" />
                            <div className="mt-2">
                              <div className="text-3xl font-display font-semibold text-white mb-1 tracking-tight">{stat.val}</div>
                              <div className="text-xs text-text-secondary font-medium">{stat.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:p-8 flex flex-col relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div>
                            <h4 className="text-white font-medium text-lg tracking-tight mb-1">System Load</h4>
                            <p className="text-xs text-text-secondary">Requests per minute (thousands)</p>
                          </div>
                          <div className="flex gap-2 p-1 rounded-lg bg-surface-hover/50 border border-white/5">
                            <span className="text-xs font-medium px-3 py-1.5 rounded bg-transparent hover:bg-white/5 text-text-muted cursor-pointer transition-colors">1H</span>
                            <span className="text-xs font-medium px-3 py-1.5 rounded bg-accent/20 border border-accent/30 text-accent cursor-pointer shadow-[0_0_10px_rgba(var(--accent),0.2)]">24H</span>
                            <span className="text-xs font-medium px-3 py-1.5 rounded bg-transparent hover:bg-white/5 text-text-muted cursor-pointer transition-colors">7D</span>
                          </div>
                        </div>

                        <div className="flex-1 flex items-end gap-3 sm:gap-6 relative z-10 mt-4">
                          {[40, 70, 45, 90, 65, 80, 50, 100, 85, 60, 75, 45].map((h, i) => (
                            <div key={i} className="flex-1 relative h-full flex items-end group/bar">
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-white/10 shadow-xl text-xs font-mono text-white px-3 py-1.5 rounded opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2 transition-all pointer-events-none whitespace-nowrap z-20">
                                {h}k reqs
                              </div>
                              <div className="w-full bg-gradient-to-t from-accent/10 to-accent/40 rounded-t border-t border-accent/60 group-hover/bar:to-accent/60 group-hover/bar:border-accent transition-colors shadow-[0_0_15px_rgba(var(--accent),0.1)] group-hover/bar:shadow-[0_0_20px_rgba(var(--accent),0.4)]" style={{ height: `${h}%` }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 2: CUSTOMERS */}
                    <div className="w-1/3 h-full p-6 lg:p-8 flex flex-col gap-6">
                      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                        <h4 className="text-white font-medium text-lg tracking-tight">Active Customers</h4>
                        <button className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium shadow-[0_0_15px_rgba(var(--accent),0.3)]">Add Customer</button>
                      </div>

                      <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
                        <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 text-xs font-medium text-text-muted uppercase tracking-wider bg-white/[0.01]">
                          <div className="col-span-2">Customer</div>
                          <div>Plan</div>
                          <div>Status</div>
                        </div>
                        <div className="flex flex-col overflow-y-auto">
                          {[
                            { name: "Acme Corp", email: "contact@acme.inc", plan: "Enterprise", status: "Active" },
                            { name: "Global Logistics", email: "sysadmin@globallogistics.com", plan: "Pro", status: "Active" },
                            { name: "Stark Industries", email: "tony@stark.com", plan: "Enterprise", status: "Warning" },
                            { name: "Wayne Enterprises", email: "it@wayne.com", plan: "Pro", status: "Active" },
                            { name: "Cyberdyne", email: "root@skynet.com", plan: "Starter", status: "Error" },
                          ].map((cust, i) => (
                            <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
                              <div className="col-span-2 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white font-bold">{cust.name[0]}</div>
                                <div>
                                  <div className="text-sm font-medium text-white group-hover:text-accent transition-colors">{cust.name}</div>
                                  <div className="text-xs text-text-secondary">{cust.email}</div>
                                </div>
                              </div>
                              <div className="text-sm text-text-secondary">{cust.plan}</div>
                              <div className="flex items-center justify-between pr-4">
                                <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${cust.status === 'Active' ? 'text-green-400 bg-green-400/10 border-green-400/20' :
                                    cust.status === 'Warning' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' :
                                      'text-red-400 bg-red-400/10 border-red-400/20'
                                  }`}>
                                  {cust.status}
                                </span>
                                <MoreHorizontal className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SCREEN 3: SETTINGS */}
                    <div className="w-1/3 h-full p-6 lg:p-8 flex flex-col gap-6">
                      <div className="border-b border-white/5 pb-6">
                        <h4 className="text-white font-medium text-lg tracking-tight mb-2">Organization Settings</h4>
                        <p className="text-sm text-text-secondary">Manage your team and platform configuration.</p>
                      </div>

                      <div className="flex-1 flex flex-col gap-6">
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                          <h5 className="text-white font-medium mb-4">API Configuration</h5>
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm text-white font-medium">Production Environment</div>
                                <div className="text-xs text-text-secondary">Enable live traffic routing to production clusters</div>
                              </div>
                              <div className="w-10 h-6 bg-accent rounded-full relative shadow-[0_0_10px_rgba(var(--accent),0.5)]">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                              </div>
                            </div>
                            <div className="w-full h-px bg-white/5 my-2" />
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-sm text-white font-medium">Auto-scaling</div>
                                <div className="text-xs text-text-secondary">Automatically provision instances during traffic spikes</div>
                              </div>
                              <div className="w-10 h-6 bg-accent rounded-full relative shadow-[0_0_10px_rgba(var(--accent),0.5)]">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                          <h5 className="text-white font-medium mb-4">Danger Zone</h5>
                          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex justify-between items-center">
                            <div>
                              <div className="text-sm text-red-400 font-medium">Delete Organization</div>
                              <div className="text-xs text-text-secondary mt-1">Permanently delete all data and configuration</div>
                            </div>
                            <button className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-colors">Delete</button>
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
      <section className="bg-surface pt-16 sm:pt-32 pb-16 sm:pb-32 relative z-10 border-b border-border">
        <div className="w-[80%] max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {HIGHLIGHTS.map(({ title, description, icon: Icon }) => (
              <div key={title} className="p-6 rounded-2xl border border-border bg-surface hover:bg-surface-hover transition-colors">
                <Icon className="h-6 w-6 text-accent-soft mb-4" />
                <h3 className="font-medium text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
