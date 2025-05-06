
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "airline-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply CSS variables based on theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setResolvedTheme(systemTheme);
      
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
      root.setAttribute("data-theme", systemTheme);
      
      // Apply CSS variables
      if (systemTheme === "dark") {
        applyDarkThemeVariables(root);
      } else {
        applyLightThemeVariables(root);
      }
      return;
    }

    // Apply direct theme settings
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
    setResolvedTheme(theme as "dark" | "light");
    
    // Apply CSS variables
    if (theme === "dark") {
      applyDarkThemeVariables(root);
    } else {
      applyLightThemeVariables(root);
    }
    
    // Save to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = () => {
        const newSystemTheme = media.matches ? "dark" : "light";
        setResolvedTheme(newSystemTheme);
        
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newSystemTheme);
        root.setAttribute("data-theme", newSystemTheme);
        
        // Apply CSS variables
        if (newSystemTheme === "dark") {
          applyDarkThemeVariables(root);
        } else {
          applyLightThemeVariables(root);
        }
      };
      
      // Initial setup
      handleChange();
      
      // Listen for changes
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    resolvedTheme,
    toggleTheme,
  };

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

// Apply dark theme CSS variables
function applyDarkThemeVariables(root: HTMLElement) {
  root.style.setProperty('--background', '#121212');
  root.style.setProperty('--text-color', '#e0e0e0');
  root.style.setProperty('--card-background', '#1e1e1e');
  root.style.setProperty('--primary-color', '#3399ff');
  root.style.setProperty('--secondary-color', '#8a8a8a');
  root.style.setProperty('--border-color', '#333333');
  root.style.setProperty('--hover-color', 'rgba(51, 153, 255, 0.1)');
  root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
  root.style.setProperty('--input-background', '#2d2d2d');
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
