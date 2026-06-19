import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  intensity?: "soft" | "focused";
  position?: "top" | "bottom" | "center";
}

export function Spotlight({ 
  className, 
  intensity = "soft",
  position = "top"
}: SpotlightProps) {
  
  const intensityClass = intensity === "soft" ? "opacity-20 blur-[80px]" : "opacity-40 blur-[40px]";
  
  const positionClass = 
    position === "top" ? "top-0 -translate-y-1/2" :
    position === "bottom" ? "bottom-0 translate-y-1/2" :
    "top-1/2 -translate-y-1/2";

  return (
    <div className={cn("absolute left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-[2/1] pointer-events-none mix-blend-screen z-0", positionClass, className)}>
      <div 
        className={cn(
          "w-full h-full rounded-[100%] bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]",
          intensityClass
        )}
      />
    </div>
  );
}
