import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes and the /go affiliate redirect handler
  // - Next.js internals and static files
  matcher: ['/((?!api|go|_next|_vercel|.*\\..*).*)'],
};
