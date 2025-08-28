import NotFoundPageContent from '../components/common/NotFoundPageContent';
import PublicLayout from '../layout/PublicLayout';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <PublicLayout>
      <NotFoundPageContent />
    </PublicLayout>
  );
}
