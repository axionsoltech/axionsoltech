import { Landmark, HeartPulse, Truck, ShoppingCart, GraduationCap, Building2, type LucideIcon } from 'lucide-react';

export interface Industry {
  icon: LucideIcon;
  name: string;
  description: string;
}

export const INDUSTRIES: Industry[] = [
  { icon: Landmark, name: 'FinTech', description: 'Payments, lending, and compliance-heavy platforms.' },
  { icon: HeartPulse, name: 'Healthcare', description: 'Patient-facing and clinical systems built for privacy and reliability.' },
  { icon: Truck, name: 'Logistics', description: 'Real-time tracking, dispatch, and fleet coordination.' },
  { icon: ShoppingCart, name: 'E-Commerce', description: 'Storefronts and backend systems that hold up during peak traffic.' },
  { icon: GraduationCap, name: 'EdTech', description: 'Learning platforms and tools for students and institutions.' },
  { icon: Building2, name: 'Enterprise SaaS', description: 'Multi-tenant platforms built to scale across customers.' },
];
