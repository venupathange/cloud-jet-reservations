
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

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
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Toggle
          aria-label="Toggle theme"
          pressed={isDark}
          onPressedChange={toggleTheme}
          className="data-[state=on]:bg-sidebar-accent"
        >
          <span className="sr-only">{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
        </Toggle>
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    );
  }

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className={className}
      >
        {isDark ? (
          <>
            <Sun className="h-4 w-4 mr-2" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 mr-2" />
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
      className={`rounded-full ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
    </Button>
  );
}
