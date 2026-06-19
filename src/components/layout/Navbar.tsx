import { NavigationLink } from "../ui/NavigationLink";

export function Navbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Program", href: "/program" },
    { label: "Benefits", href: "/benefits" },
    { label: "Eligibility", href: "/eligibility" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 h-[80px] flex items-center justify-between z-50 relative pt-6">
      {/* Logo Area */}
      <div className="flex-shrink-0">
        <div className="w-10 h-12 flex items-center justify-center">
          {/* Brand Monogram placeholder based on reference - A red abstract shape */}
          <svg viewBox="0 0 40 48" fill="none" className="w-full h-full text-accent">
            <path d="M20 0 L40 48 L25 48 L20 30 L15 48 L0 48 Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {links.map((link) => (
          <NavigationLink key={link.label} href={link.href}>
            {link.label}
          </NavigationLink>
        ))}
      </div>
      
      {/* Mobile Menu Icon */}
      <div className="md:hidden text-foreground">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12H21M3 6H21M3 18H21"/>
        </svg>
      </div>
    </nav>
  );
}
