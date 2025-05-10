
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export interface SidebarItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const location = useLocation();
  
  return (
    <aside className="hidden md:flex border-r bg-sidebar border-sidebar-border min-h-[calc(100vh-4rem)] w-64 flex-col">
      <div className="px-3 py-4 flex flex-col h-full">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">
          Dashboard
        </h2>
        <div className="space-y-1 flex-1">
          {items.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                location.pathname === item.path 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 px-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-sidebar-foreground">Theme</span>
            <ThemeToggle variant="switch" />
          </div>
        </div>
      </div>
    </aside>
  );
}
