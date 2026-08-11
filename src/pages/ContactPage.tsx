import { Contact } from '../components/Contact';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ContactPage() {
  usePageTitle('Contact');

  return <Contact />;
}
