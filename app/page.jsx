'use client'
import React from "react";
import HeaderSlider from "../components/HeaderSlider";
import HomeProducts from "../components/HomeProducts";
import NewsLetter from "../components/NewsLetter";
import FeaturedProduct from "../components/FeaturedProduct";
import Banner from "../components/Banner";


const Home = () => {
  return (
    <>
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner/>
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
