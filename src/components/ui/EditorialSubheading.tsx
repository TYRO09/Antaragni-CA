import { cn } from "@/lib/utils";

export function EditorialSubheading({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-sans font-medium text-[clamp(16px,4vw,24px)] leading-[1.3] tracking-[0.05em] uppercase", className)}
      {...props}
    >
      {children}
    </p>
  );
}
