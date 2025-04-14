
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="flights" element={<FlightsPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="profile" element={<Profile />} />
              
              {/* Admin-only routes */}
              <Route element={<RoleGuard allowedRoles={['admin']} />}>
                <Route path="wallets" element={<WalletsPage />} />
                <Route path="add-airplane" element={<AddAirplanePage />} />
                <Route path="add-airport" element={<AddAirportPage />} />
                <Route path="add-flight" element={<AddFlightPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
              </Route>
              
              {/* Customer-only routes */}
              <Route element={<RoleGuard allowedRoles={['customer']} />}>
                <Route path="wallet" element={<WalletPage />} />
                <Route path="review" element={<ReviewPage />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
