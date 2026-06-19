import { cn } from "@/lib/utils";

interface GradientDiffusionProps {
  className?: string;
  color?: "white" | "crimson";
}

export function GradientDiffusion({ 
  className,
  color = "white" 
}: GradientDiffusionProps) {
  
  const colorClass = color === "white" ? "from-white/15" : "from-accent/20";

  return (
    <div className={cn("absolute inset-0 pointer-events-none mix-blend-screen z-0 flex items-center justify-center", className)}>
      <div 
        className={cn(
          "w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] to-transparent blur-[60px] opacity-70",
          colorClass
        )}
      />
    </div>
  );
}
