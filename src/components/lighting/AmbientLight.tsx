import { cn } from "@/lib/utils";

interface AmbientLightProps {
  className?: string;
  color?: "white" | "crimson" | "gold";
  intensity?: "faint" | "subtle" | "medium";
}

const colorMap = {
  white: "from-white",
  crimson: "from-accent",
  gold: "from-yellow-700", // Muted gold
};

const intensityMap = {
  faint: "opacity-[0.02]",
  subtle: "opacity-[0.05]",
  medium: "opacity-10",
};

export function AmbientLight({ 
  className, 
  color = "white", 
  intensity = "subtle" 
}: AmbientLightProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 pointer-events-none mix-blend-screen z-0",
        className
      )}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] to-transparent blur-[120px]",
          colorMap[color],
          intensityMap[intensity]
        )}
      />
    </div>
  );
}
