
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/hooks/use-theme";

// Pages
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./pages/Dashboard/Overview";
import FlightsPage from "./pages/Dashboard/Flights";
import BookingsPage from "./pages/Dashboard/Bookings";
import WalletsPage from "./pages/Dashboard/Wallets";
import WalletPage from "./pages/Dashboard/Wallet";
import AddAirplanePage from "./pages/Dashboard/AddAirplane";
import AddAirportPage from "./pages/Dashboard/AddAirport";
import ReviewsPage from "./pages/Dashboard/Reviews";
import ReviewPage from "./pages/Dashboard/Review";
import Index from "./pages/Index";
import AddFlightPage from "./pages/Dashboard/AddFlight";
import RoleGuard from "./components/auth/RoleGuard";
import Profile from "./pages/Dashboard/Profile";
import ChatBot from "./components/chat/ChatBot";
import TravelPackagesPage from "./pages/Dashboard/TravelPackages";
import BookingStats from "./pages/Dashboard/BookingStats";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="airline-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="flights" element={<FlightsPage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="booking-stats" element={<BookingStats />} />
                <Route path="profile" element={<Profile />} />
                <Route path="packages" element={<TravelPackagesPage />} />
                
                <Route element={<RoleGuard allowedRoles={['admin']} />}>
                  <Route path="wallets" element={<WalletsPage />} />
                  <Route path="add-airplane" element={<AddAirplanePage />} />
                  <Route path="add-airport" element={<AddAirportPage />} />
                  <Route path="add-flight" element={<AddFlightPage />} />
                  <Route path="reviews" element={<ReviewsPage />} />
                </Route>
                
                <Route element={<RoleGuard allowedRoles={['customer']} />}>
                  <Route path="wallet" element={<WalletPage />} />
                  <Route path="review" element={<ReviewPage />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <ChatBot />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
