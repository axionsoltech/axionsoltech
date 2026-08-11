import { Building2, MessagesSquare, LayoutTemplate, Users, Landmark, ShieldCheck, type LucideIcon } from 'lucide-react';

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const INSURADESK_FEATURES: ProductFeature[] = [
  {
    icon: Building2,
    title: 'Multi-tenant, white-label',
    description: 'Every broker gets their own branded storefront — colors, logo, and domain — running on one shared platform.',
  },
  {
    icon: Landmark,
    title: 'Real insurer integrations',
    description: 'Live API integrations for motor, health, life, and travel insurance — not mocked demos, real quote-and-issue flows.',
  },
  {
    icon: Users,
    title: 'Broker, agent & customer portals',
    description: 'Three purpose-built consoles: brokers manage the business, agents sell policies, customers self-serve their own policies and claims.',
  },
  {
    icon: MessagesSquare,
    title: 'WhatsApp & live chat, built in',
    description: 'Customers can get quotes, ask questions, and get support over WhatsApp and in-app chat — not bolted-on afterthoughts.',
  },
  {
    icon: LayoutTemplate,
    title: 'No-code page builder',
    description: 'Brokers customize their own storefront layout and content without ever touching a line of code.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for compliance',
    description: 'KYC, policy documentation, and claims workflows designed around how regulated insurance businesses actually operate.',
  },
];
