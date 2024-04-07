import React from 'react'
import HeroSection from './HeroSection';
import HowItWorks from './HowitWorks';
import PopularCompanies from './PopularCompanies';
import PopularCategories from './PopularCategories';

const Home = () => {
  return (
    <>
    <HeroSection />
    <HowItWorks />
    <PopularCategories />
    <PopularCompanies />
    </>
  )
}

export default Home