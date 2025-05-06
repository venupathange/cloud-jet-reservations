
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-muted-foreground/20 transition-all duration-300 hover:bg-muted"
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Dark mode</span>
            <Switch 
              checked={resolvedTheme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <DropdownMenuItem 
              className={`${theme === "light" ? "bg-muted" : ""} cursor-pointer rounded-md`} 
              onClick={() => { setTheme("light"); setIsOpen(false); }}
            >
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className={`${theme === "dark" ? "bg-muted" : ""} cursor-pointer rounded-md`} 
              onClick={() => { setTheme("dark"); setIsOpen(false); }}
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className={`${theme === "system" ? "bg-muted" : ""} cursor-pointer rounded-md`} 
              onClick={() => { setTheme("system"); setIsOpen(false); }}
            >
              <span className="mr-2">🖥️</span>
              <span>System</span>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
