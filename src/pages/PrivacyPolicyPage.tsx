import { PageHero } from '../components/PageHero';
import { usePageTitle } from '../hooks/usePageTitle';

/** Standard template privacy policy — covers the common sections a services company site
 *  needs. Written to be genuinely accurate to how a site like this one behaves (contact form,
 *  no ad trackers by default), but still needs a real legal review before production launch. */
export default function PrivacyPolicyPage() {
  usePageTitle('Privacy Policy');

  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: January 2026" />

      <section className="relative pb-24 sm:pb-32">
        <div className="text-text-secondary mx-auto w-full md:w-[75%] max-w-3xl space-y-10 px-4 text-sm leading-relaxed sm:px-6">
          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              1. Overview
            </h2>
            <p>
              Axion Sol Tech ("we", "us", "our") respects your privacy. This policy explains what
              information we collect when you use this website, how we use it, and the choices you
              have. It applies to axionsoltech.com and does not cover third-party sites we may link
              to.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              2. Information we collect
            </h2>
            <p className="mb-3">We collect information in two ways:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-text-primary">Information you provide directly</strong> —
                your name, email address, and project details when you submit our contact form.
              </li>
              <li>
                <strong className="text-text-primary">Information collected automatically</strong> —
                standard technical data such as IP address, browser type, and pages visited,
                collected through basic server logs and, if enabled, privacy-respecting analytics.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              3. How we use your information
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To respond to inquiries submitted through our contact form</li>
              <li>To understand how visitors use our site, so we can improve it</li>
              <li>To meet legal and security obligations</li>
            </ul>
            <p className="mt-3">We do not sell your personal information to third parties.</p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              4. Cookies
            </h2>
            <p>
              This site may use essential cookies required for basic functionality, and — if
              configured — privacy-conscious analytics cookies to understand aggregate site usage.
              We do not use third-party advertising trackers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              5. Data retention
            </h2>
            <p>
              Contact form submissions are retained only as long as needed to respond to your
              inquiry and for a reasonable period afterward for our own records, unless you ask us
              to delete them sooner.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              6. Your rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, or request
              deletion of your personal information. To exercise any of these rights, contact us at
              the email address below.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              7. Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. Material changes will be reflected by
              updating the "last updated" date above.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              8. Contact
            </h2>
            <p>
              Questions about this policy can be sent to{' '}
              <a
                href="mailto:privacy@axionsoltech.com"
                className="text-accent-soft hover:text-accent"
              >
                privacy@axionsoltech.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
