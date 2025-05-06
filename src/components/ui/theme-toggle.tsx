
import * as React from "react"
import { Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring overflow-hidden"
            aria-label="Theme"
            disabled
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Sun className="h-5 w-5 text-amber-500" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-500 opacity-15" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>🌞 Light Theme - Optimized for readability</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
