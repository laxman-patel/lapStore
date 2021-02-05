import React from "react";
import Image from "next/image";
import featureData from "../data/features.json";

const Features = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">
            Why Buy from
            <span className="border-b-4 border-blue-500"> LapStore</span> ?
          </h1>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {featureData.map(({ body, iconSrc, title }) => (
              <FeatureSection
                key={title}
                body={body}
                iconSrc={iconSrc}
                title={title}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const FeatureSection = ({ title, iconSrc, body }) => (
  <>
    <div className="p-4 md:w-1/3 flex">
      <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0">
        <Image src={iconSrc} width="24" height="24" />
      </div>
      <div className="flex-grow pl-6">
        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
          {title}
        </h2>
        <p className="leading-relaxed text-base">{body}</p>
        <a className="mt-3 text-blue-500 inline-flex items-center">
          Learn More &#8599;
        </a>
      </div>
    </div>
  </>
);

export default Features;
