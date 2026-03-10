import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>2026 GeonU Park. Data Scientist.</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/pgnu10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link href="mailto:afnf33@gmail.com" className="hover:text-foreground transition-colors">
            Email
          </Link>
          <Link href="/resume" className="hover:text-foreground transition-colors">
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
