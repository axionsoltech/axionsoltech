import {
  Globe,
  Smartphone,
  Cloud,
  BrainCircuit,
  Palette,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  stack: string[];
  image: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: 'web-engineering',
    icon: Globe,
    title: 'Web Engineering',
    tagline: 'Fast, resilient web platforms built to scale.',
    description:
      'We design and build web applications that hold up under real traffic — from customer-facing marketing sites to complex internal platforms. Every build starts with the same architectural rigor: typed end to end, tested before it ships, and instrumented so you know how it performs in production, not just in staging.',
    deliverables: [
      'Product & marketing websites',
      'Customer & internal dashboards',
      'Design systems & component libraries',
      'API design and backend services',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'mobile-apps',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'Native-feel apps for iOS and Android.',
    description:
      'Whether you need a fully native experience or a cross-platform build that ships to both stores from one codebase, we match the approach to your timeline and budget — without compromising on performance, offline support, or the small interaction details that make an app feel finished.',
    deliverables: [
      'iOS & Android apps',
      'Cross-platform builds (React Native)',
      'Push notifications & deep linking',
      'App Store / Play Store release management',
    ],
    stack: ['React Native', 'Swift', 'Kotlin', 'TypeScript', 'Firebase'],
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'cloud-devops',
    icon: Cloud,
    title: 'Cloud & DevOps',
    tagline: 'Infrastructure that scales without drama.',
    description:
      'We design cloud architecture and delivery pipelines that let your team ship confidently — infrastructure as code, automated testing gates, and observability from day one, so scaling up is a configuration change, not a fire drill.',
    deliverables: [
      'Cloud architecture & migration',
      'CI/CD pipeline design',
      'Infrastructure as code (Terraform)',
      'Monitoring, logging & incident response setup',
    ],
    stack: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'],
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'ai-automation',
    icon: BrainCircuit,
    title: 'AI & Automation',
    tagline: 'Practical AI, not proof-of-concept theater.',
    description:
      'We help teams identify where AI genuinely moves the needle — customer-facing features, internal workflow automation, or data pipelines — then ship it as production software with the same reliability bar as the rest of your stack.',
    deliverables: [
      'AI-assisted product features',
      'Internal workflow automation',
      'LLM integration & prompt engineering',
      'Data pipeline & model-serving infrastructure',
    ],
    stack: ['Python', 'PyTorch', 'LangChain', 'OpenAI API', 'Vector databases'],
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'product-design',
    icon: Palette,
    title: 'Product & UI/UX',
    tagline: 'Design that earns its place in the build.',
    description:
      'Good design is the shortest path between a complex problem and a simple screen. We research, prototype, and validate before a single production line of UI code gets written — so the build phase is about execution, not guesswork.',
    deliverables: [
      'Product discovery & research',
      'Wireframing & interactive prototypes',
      'Design systems',
      'Usability testing',
    ],
    stack: ['Figma', 'Framer', 'Storybook'],
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'security-qa',
    icon: ShieldCheck,
    title: 'Security & QA',
    tagline: 'Quality and security built in, not bolted on.',
    description:
      'Every release goes through automated test coverage and security review as a standard part of the pipeline — not an afterthought before a big client demo. We help teams put the same discipline in place for their own release process.',
    deliverables: [
      'Security audits & threat modeling',
      'Automated test suite design',
      'Load & performance testing',
      'Compliance readiness (SOC 2, GDPR)',
    ],
    stack: ['Playwright', 'Jest', 'OWASP ZAP', 'Snyk'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
