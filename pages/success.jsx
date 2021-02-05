import React from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";

const Success = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <>
      <Layout>
        <div className="container mx-auto h-screen flex justify-center px-5">
          <div className="mt-56 flex flex-col items-center">
            <h1 className="animate-bounce text-9xl">🥳</h1>
            <h1 className="text-3xl mx-1 md:text-5xl mt-10 md:max-w-3xl text-center">
              Your order is successfully processed by us.
            </h1>
            <p className="text-center mt-5 text-gray-500 font-thin">
              Your order ID is {id}
            </p>
            <Link href="/store">
              <a className="flex text-blue-500 text-sm mt-10 underline hover:text-blue-600">
                &#8598; Continue Shopping
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Success;
