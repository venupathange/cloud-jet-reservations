
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="flights" element={<FlightsPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="wallets" element={<WalletsPage />} />
              <Route path="wallet" element={<WalletPage />} />
              <Route path="add-airplane" element={<AddAirplanePage />} />
              <Route path="add-airport" element={<AddAirportPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="review" element={<ReviewPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
