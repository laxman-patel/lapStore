import React from "react";
import Image from "next/image";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image src="/logo.svg" width="120" height="35" />
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2021 LapStore —
            <a
              href="https://github.com/laxman-patel"
              className="text-gray-600 ml-1 hover:text-gray-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              @Laxman-patel
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <SocialIcons />
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
