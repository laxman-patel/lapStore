import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="text-gray-900 body-font ">
        <div className="container mx-auto flex lg:py-32 px-5 py-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Buy Laptops for any use case.
            </h1>
            <p className="mb-8 leading-relaxed font-medium lg:max-w-xl">
              At LapStore, you will find the huge variety of laptops from Gaming
              to professional ones with lowest guaranteed price and 6 months
              warranty.
            </p>
            <div className="flex justify-center">
              <Link href="/store">
                <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none rounded-full text-lg hover:bg-blue-600">
                  Visit store &#8599;
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-xl lg:w-full md:w-1/2 w-5/6 hover:shadow-lg transition-shadow">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="/hero.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
