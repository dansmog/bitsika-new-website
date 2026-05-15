import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-ink-secondary">
        404
      </p>
      <h1 className="mt-3 text-3xl md:text-4xl font-medium tracking-[-0.02em] text-ink">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-ink-secondary">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
      >
        Back to home
      </Link>
    </main>
  );
}
