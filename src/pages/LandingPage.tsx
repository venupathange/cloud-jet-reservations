
import React from 'react';
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DestinationsSection from "@/components/landing/DestinationsSection";
import WhyChooseUsSection from "@/components/landing/WhyChooseUsSection";
import CallToActionSection from "@/components/landing/CallToActionSection";
import FooterSection from "@/components/landing/FooterSection";

export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : ''}`}>
      <Header />
      <HeroSection isDark={isDark} />
      <StatsSection isDark={isDark} />
      <FeaturesSection isDark={isDark} />
      <DestinationsSection isDark={isDark} />
      <WhyChooseUsSection isDark={isDark} />
      <CallToActionSection />
      <FooterSection isDark={isDark} />
    </div>
  );
}
