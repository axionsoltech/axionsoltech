export interface ProjectCaseStudy {
  slug: string;
  category: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  image: string;
}

/** Representative case studies — illustrate the kind of engagements we take on and how we
 *  approach them, not a claim of a specific named client roster. */
export const PROJECTS: ProjectCaseStudy[] = [
  {
    slug: 'multi-tenant-saas-platform',
    category: 'Web Platform',
    title: 'Multi-Tenant SaaS Platform',
    summary: 'A B2B platform rebuilt from a single-tenant monolith into a scalable, white-labelable product.',
    problem: 'The existing product could only serve one customer per deployment, making onboarding slow and infrastructure costs unpredictable.',
    approach: 'Re-architected the data layer for tenant isolation, introduced a plugin-based theming system, and migrated the deployment pipeline to a single multi-tenant cluster.',
    outcome: 'New customers now onboard in hours instead of weeks, with a single codebase serving every tenant.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Terraform'],
    image: '/images/projects/saas.png?v=2',
  },
  {
    slug: 'realtime-logistics-dispatch',
    category: 'Mobile + Backend',
    title: 'Real-Time Logistics Dispatch',
    summary: 'A dispatcher and driver app pair for coordinating same-day deliveries at scale.',
    problem: 'Manual dispatching couldn’t keep up with delivery volume, and drivers had no live visibility into route changes.',
    approach: 'Built a real-time dispatch engine with live location tracking, automatic route re-optimization, and a driver app with offline-first sync.',
    outcome: 'Dispatch decisions that used to take minutes now resolve in near real time, even with an unreliable network.',
    stack: ['React Native', 'Go', 'Redis', 'PostgreSQL', 'WebSockets'],
    image: '/images/projects/infra.png?v=2',
  },
  {
    slug: 'clinical-patient-portal',
    category: 'Healthcare',
    title: 'Clinical Patient Portal',
    summary: 'A HIPAA-aligned portal for appointment scheduling, records access, and secure messaging.',
    problem: 'Patients had no self-service way to book appointments or reach their care team outside clinic hours.',
    approach: 'Designed a portal with role-based access, encrypted messaging, and calendar integrations, validated against HIPAA technical safeguards throughout.',
    outcome: 'Front-desk call volume dropped as routine scheduling and questions moved to the self-service portal.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    image: '/images/projects/fintech.png?v=2',
  },
  {
    slug: 'realtime-analytics-dashboard',
    category: 'Data & AI',
    title: 'Real-Time Analytics Dashboard',
    summary: 'A streaming analytics dashboard turning raw event data into decisions teams could act on same-day.',
    problem: 'Reporting was a next-day batch process, too slow for teams trying to react to what was happening right now.',
    approach: 'Built a streaming ingestion pipeline and a dashboard layer with sub-second query performance on rolling windows of event data.',
    outcome: 'Teams moved from next-day reports to same-session decisions on live data.',
    stack: ['Python', 'Kafka', 'ClickHouse', 'React'],
    image: '/images/projects/ai.png?v=2',
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
