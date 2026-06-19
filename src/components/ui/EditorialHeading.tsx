import { cn } from "@/lib/utils";

interface EditorialHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  variant?: "hero" | "section" | "number";
}

export function EditorialHeading({
  as: Component = "h2",
  variant = "section",
  className,
  children,
  ...props
}: EditorialHeadingProps) {
  const baseStyles = "font-serif uppercase -tracking-[0.02em]";
  
  const variants = {
    hero: "text-[clamp(60px,10vw,130px)] xl:text-[130px] leading-[0.9]",
    section: "text-[clamp(44px,8vw,80px)] leading-none",
    number: "text-[clamp(28px,4vw,48px)] leading-none tracking-[0.02em]",
  };

  return (
    <Component
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
