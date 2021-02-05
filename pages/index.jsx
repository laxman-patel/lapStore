import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <Hero />
        <Features />
        <Testimonials />
      </Layout>
    </>
  );
};

export default Home;
