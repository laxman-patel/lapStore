import React from "react";
import Image from "next/image";

const SocialIcons = () => {
  return (
    <>
      <a>
        <Image src="/facebook.svg" width="20" height="20" />
      </a>
      <a className="ml-3">
        <Image src="/twitter.svg" width="20" height="20" />
      </a>
      <a className="ml-3">
        <Image src="/insta.svg" width="20" height="20" />
      </a>
      <a className="ml-3">
        <Image src="/linkedin.svg" width="20" height="20" />
      </a>
    </>
  );
};

export default SocialIcons;
