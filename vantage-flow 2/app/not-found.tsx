import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-flow flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-5xl tracking-tightest sm:text-6xl">Off the map</h1>
      <p className="mt-4 max-w-sm text-stone-dark dark:text-stone">
        The page you're looking for doesn't exist, or has moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
