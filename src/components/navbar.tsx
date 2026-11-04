import Link from "next/link";

export function Navbar() {
  return (
    <header className="nav">
      <Link href="/" className="nav__brand">
        The Broken Knell
      </Link>
      <nav aria-label="Ana gezinme">
        <ul className="nav__links">
          <li>
            <Link href="/bolumler" className="nav__link">
              Bölümler
            </Link>
          </li>
          <li>
            <Link href="/hakkinda" className="nav__link">
              Hakkında
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
