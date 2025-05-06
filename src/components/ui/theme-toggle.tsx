
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative h-9 w-9 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring overflow-hidden"
            aria-label="Toggle theme"
          >
            {/* Inner container for toggle sliding effect */}
            <div className="absolute h-full w-full transition-transform duration-500 ease-in-out">
              {/* Sun icon */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transform ${
                  resolvedTheme === "dark" ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
                } transition-all duration-500`}
              >
                <Sun className="h-5 w-5 text-amber-500" />
              </div>
              
              {/* Moon icon */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transform ${
                  resolvedTheme === "dark" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                } transition-all duration-500`}
              >
                <Moon className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            
            {/* Background effects */}
            <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-tr transition-opacity duration-500 ${
                resolvedTheme === "dark" 
                  ? "from-blue-900 to-indigo-700 opacity-25" 
                  : "from-amber-300 to-yellow-500 opacity-15"
              }`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>🌓 Theme – Switch between Light and Dark Mode for optimized viewing experience</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
