export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'How long does a typical engagement take?',
    answer: 'It depends entirely on scope. A focused MVP usually takes 6-10 weeks; larger platform builds or ongoing dedicated-team engagements run for months. We give you a realistic timeline during the discovery call, before any commitment.',
  },
  {
    question: 'Who owns the code and IP once the project is done?',
    answer: 'You do — fully. Every engagement includes a complete IP assignment to you on final payment. There\'s no vendor lock-in and no dependency on us continuing to host or maintain anything unless you want us to.',
  },
  {
    question: 'Do you only work in the tech stack shown on your site?',
    answer: 'That\'s our most common stack, not a hard limit. We choose the right tool for the job — if your existing codebase is in a different stack, we\'ll work in it rather than force a rewrite that doesn\'t serve you.',
  },
  {
    question: 'What happens after launch — do you disappear?',
    answer: 'No. Every project includes a defined post-launch support window, and most clients move into an ongoing retainer or dedicated-team arrangement afterward. We\'re upfront about which one makes sense for your situation.',
  },
  {
    question: 'How is pricing structured?',
    answer: 'Three ways, depending on the engagement model you pick: fixed price for well-defined scopes, a monthly retainer for dedicated teams, or an hourly/day rate for staff augmentation. We\'ll recommend one after understanding your project.',
  },
  {
    question: 'Can you work with our existing in-house team?',
    answer: 'Yes — that\'s exactly what our staff augmentation model is for. Our engineers plug into your existing tools, standups, and code review process rather than working in a silo.',
  },
  {
    question: 'What if our requirements change mid-project?',
    answer: 'They usually do, and that\'s fine. Fixed-scope engagements have a formal change-request process; dedicated-team and staff-augmentation engagements are built for exactly this kind of flexibility since you\'re steering the backlog directly.',
  },
];
