
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plane, Menu, User, LogOut } from "lucide-react";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-airline-blue" />
          <span className="font-bold text-xl text-airline-blue">Cloud Jet Services</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-airline-blue">
            Home
          </Link>
          <Link to="/flights" className="text-sm font-medium hover:text-airline-blue">
            Flights
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-airline-blue">
            About Us
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-airline-blue">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.email} <span className="text-xs capitalize text-gray-500">({user?.userType})</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full flex">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-airline-blue hover:text-airline-navy">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-airline-blue hover:bg-airline-navy">
                  Register
                </Button>
              </Link>
            </div>
          )}
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
