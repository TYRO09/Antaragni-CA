import { cn } from "@/lib/utils";

interface LightBeamProps {
  className?: string;
  angle?: number;
  color?: "white" | "crimson" | "gold";
}

const colorMap = {
  white: "from-white/30",
  crimson: "from-accent/40",
  gold: "from-yellow-700/40",
};

export function LightBeam({ 
  className,
  angle = 45,
  color = "white"
}: LightBeamProps) {
  return (
    <div 
      className={cn("absolute pointer-events-none mix-blend-screen z-0 transform-gpu", className)}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div 
        className={cn(
          "w-full h-full bg-gradient-to-t to-transparent blur-[60px]",
          colorMap[color]
        )}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 50%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 50%, transparent)"
        }}
      />
    </div>
  );
}
