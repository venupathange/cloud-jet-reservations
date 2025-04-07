
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="flights" element={<FlightsPage />} />
              {/* Add more dashboard routes below */}
              <Route path="bookings" element={<div className="p-4">Bookings Content</div>} />
              <Route path="wallets" element={<div className="p-4">Wallets Content</div>} />
              <Route path="wallet" element={<div className="p-4">Wallet Content</div>} />
              <Route path="add-airplane" element={<div className="p-4">Add Airplane Content</div>} />
              <Route path="add-airport" element={<div className="p-4">Add Airport Content</div>} />
              <Route path="reviews" element={<div className="p-4">Reviews Content</div>} />
              <Route path="review" element={<div className="p-4">Review Content</div>} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
