
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "icon" | "switch" | "button";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "switch") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Sun className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-amber-500'}`} />
        <Toggle
          aria-label="Toggle theme"
          pressed={isDark}
          onPressedChange={toggleTheme}
          className={cn(
            "bg-gray-200 data-[state=on]:bg-gray-700 transition-colors",
            isDark ? "hover:bg-gray-600" : "hover:bg-gray-300"
          )}
        >
          <span className="sr-only">{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
        </Toggle>
        <Moon className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
      </div>
    );
  }

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className={cn(
          className,
          isDark ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-100"
        )}
      >
        {isDark ? (
          <>
            <Sun className="h-4 w-4 mr-2 text-amber-500" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 mr-2 text-gray-500" />
            Dark Mode
          </>
        )}
      </Button>
    );
  }

  // Default icon variant
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        `rounded-full transition-colors`,
        isDark ? "hover:bg-gray-800" : "hover:bg-gray-200",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
      <span className="sr-only">{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
    </Button>
  );
}
