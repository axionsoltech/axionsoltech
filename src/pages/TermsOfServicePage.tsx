import { PageHero } from '../components/PageHero';
import { usePageTitle } from '../hooks/usePageTitle';

/** Standard template terms of service — covers the sections a services company site typically
 *  needs for the marketing site itself. Actual client engagements are governed by their own
 *  signed statement of work / master services agreement, not this page. Needs a real legal
 *  review before production launch. */
export default function TermsOfServicePage() {
  usePageTitle('Terms of Service');

  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" description="Last updated: January 2026" />

      <section className="relative pb-24 sm:pb-32">
        <div className="text-text-secondary mx-auto w-[75%] max-w-3xl space-y-10 px-4 text-sm leading-relaxed sm:px-6">
          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              1. Acceptance of terms
            </h2>
            <p>
              By accessing this website, you agree to these terms. If you don't agree, please don't
              use the site. These terms govern use of axionsoltech.com only — any actual client
              engagement is governed separately by a signed statement of work or master services
              agreement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              2. Use of this site
            </h2>
            <p>
              You may browse this site and use the contact form to reach out about a potential
              project. You agree not to misuse the site — including attempting to disrupt its
              operation, scraping content at scale, or submitting the contact form for anything
              other than a genuine inquiry.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              3. Intellectual property
            </h2>
            <p>
              All content on this site — text, graphics, logos, and code — is the property of Axion
              Sol Tech unless otherwise noted, and may not be reproduced without permission. This
              does not apply to work delivered to clients under a separate signed agreement, which
              is governed by that agreement's own IP terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              4. No warranty
            </h2>
            <p>
              This website is provided "as is" without warranties of any kind. We make reasonable
              efforts to keep it accurate and available, but don't guarantee uninterrupted access or
              that all information is error-free.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              5. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Axion Sol Tech is not liable for any indirect,
              incidental, or consequential damages arising from your use of this website.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              6. Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. Continued use of the site after a change
              means you accept the updated terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-text-primary mb-3 text-lg font-semibold">
              7. Contact
            </h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a
                href="mailto:hello@axionsoltech.com"
                className="text-accent-soft hover:text-accent"
              >
                hello@axionsoltech.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
