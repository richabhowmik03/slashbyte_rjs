import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesOverview from '../components/ServicesOverview';
import AboutPreview from '../components/AboutPreview';
import PortfolioPreview from '../components/PortfolioPreview';
import ContactCTA from '../components/ContactCTA';

const HomePage = () => {
  return (
    <div className="pt-16">
      <HeroSection />
      <ServicesOverview />
      <AboutPreview />
      <PortfolioPreview />
      <ContactCTA />
    </div>
  );
};

export default HomePage;