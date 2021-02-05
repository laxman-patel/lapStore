import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import navItems from "../data/nav.json";
import { useState } from "react";
import { useEffect } from "react";
import store from "store2";

const Navbar = () => {
  const { pathname } = useRouter();
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const cart = store.get("cart");

    if (!cart) return;

    setCartLength(cart.length);
  }, []);

  return (
    <>
      <header className="text-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto font-light">
            {navItems.map(({ text, url }) => (
              <Link key={url} href={url}>
                <a
                  className={`mr-5 hover:opacity-80 ${
                    url === pathname
                      ? "border-b-2 border-blue-500 font-medium"
                      : ""
                  }`}
                >
                  {text}
                </a>
              </Link>
            ))}
          </nav>
          <Link href="/">
            <a className="flex order-first lg:order-none lg:w-1/5 items-center lg:items-center lg:justify-center mb-4 md:mb-0 hover:opacity-80">
              <Image src="/logo.svg" width="120" height="35" />
            </a>
          </Link>
          <div className="lg:w-2/5 inline-flex lg:justify-end lg:ml-0">
            <Link href="/cart">
              <a className="flex relative items-center justify-center bg-gray-100 border-0 w-10 h-10 p-1 focus:outline-none hover:bg-gray-200 rounded-full text-base md:mt-0 mt-4">
                {cartLength !== 0 && (
                  <span className="bg-blue-500 text-white w-4 h-4 flex justify-center items-center rounded-full absolute top-0 right-0 text-xs">
                    {cartLength}
                  </span>
                )}
                <Image src="/cart.svg" width="16" height="16" />
              </a>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
