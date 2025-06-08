import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
}

export function Logo({
  size = "md",
  className,
  showText = false,
  variant = "light",
}: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-14 h-14",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const logoImageSrc = "/uploads/gsat-logo-white-text.png";

  return (
    <div className={cn("flex items-center space-x-3 group", className)}>
      {/* Simple logo image */}
      <img
        src={logoImageSrc}
        alt="GlobalStarAuto Logo"
        className={cn("object-contain", sizeClasses[size])}
      />

      {showText && (
        <div>
          <div
            className={cn(
              "font-bold tracking-wide bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent",
              textSizeClasses[size],
              variant === "dark" && "from-slate-800 via-slate-700 to-slate-600",
            )}
          >
            GLOBALSTARAUTO
          </div>
          {size !== "sm" && (
            <div
              className={cn(
                "text-xs uppercase tracking-wider font-medium",
                variant === "light" ? "text-blue-300/80" : "text-slate-500",
              )}
            >
              PREMIUM AUTO
            </div>
          )}
        </div>
      )}
    </div>
  );
}
