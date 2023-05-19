import Link from "next/link";

const Header: React.FC = () => {
  return (
    <>
      <header className="navbar bg-base-100 fixed h-20 z-[60]">
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            SynapseStudy
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="btn btn-ghost">
                About
              </Link>
            </li>
            <li>
              <Link href="/features" className="btn btn-ghost">
                Features
              </Link>
            </li>
            <li>
              <Link href="/contact" className="btn btn-ghost">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="h-20" />
    </>
  );
};

export default Header;
