
import { createContext, useContext } from "react";

type Theme = "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: "light";
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light";
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  resolvedTheme: "light",
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  // Always use light theme
  const value = {
    theme: "light" as const,
    setTheme: () => {}, // No-op function since we only use light mode
    resolvedTheme: "light" as const,
    toggleTheme: () => {}, // No-op function since we only use light mode
  };

  // Apply light theme CSS variables
  React.useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove dark class if present and ensure light is applied
    root.classList.remove("dark");
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
    
    // Apply light theme CSS variables
    applyLightThemeVariables(root);
  }, []);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Apply light theme CSS variables
function applyLightThemeVariables(root: HTMLElement) {
  root.style.setProperty('--background', '#ffffff');
  root.style.setProperty('--text-color', '#000000');
  root.style.setProperty('--card-background', '#f5f5f5');
  root.style.setProperty('--primary-color', '#007bff');
  root.style.setProperty('--secondary-color', '#6c757d');
  root.style.setProperty('--border-color', '#e0e0e0');
  root.style.setProperty('--hover-color', 'rgba(0, 123, 255, 0.1)');
  root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
  root.style.setProperty('--input-background', '#ffffff');
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
