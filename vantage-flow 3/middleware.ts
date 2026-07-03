export { default } from "next-auth/middleware";

// Checkout intentionally stays open (guest checkout); only account pages
// require a signed-in session. Unauthenticated visitors are redirected to
// /login with a callbackUrl back to the page they wanted.
export const config = {
  matcher: ["/account/:path*"]
};
