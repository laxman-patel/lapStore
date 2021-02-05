import { gql } from "graphql-request";
import React from "react";
import Layout from "../../components/Layout";
import graphCms from "../../lib/graphcms";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import store from "store2";

const Product = ({ product }) => {
  const {
    name,
    brand,
    price,
    description,
    id,
    images: [{ url }],
  } = product;

  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [currentQty, setCurrentQty] = useState(1);

  useEffect(() => {
    const cart = store.get("cart");

    if (!cart) return;

    cart.forEach(item => {
      if (item.id === id) {
        setIsAddedToCart(true);
      }
    });
  }, []);

  const addToCart = async () => {
    const cart = store.get("cart");

    const newItem = {
      id,
      qty: currentQty,
      name,
      brand,
      imgSrc: url,
      price,
    };

    if (!cart) {
      store.set("cart", [newItem]);
    } else {
      store.add("cart", newItem);
    }

    setIsAddedToCart(true);
  };

  return (
    <>
      <Layout>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center lg:justify-between">
              <Image
                className="lg:w-1/2 w-full lg:h-auto  object-contain object-center rounded"
                src={url}
                width="550em"
                height="550em"
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="uppercase text-sm title-font text-gray-500 tracking-widest">
                  {brand}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {name}
                </h1>
                <p className="leading-relaxed mt-3">{description}</p>
                <div className="flex  my-5  items-center">
                  <span className="mr-3">Quantity</span>
                  <div className="relative">
                    <select
                      onChange={e => setCurrentQty(e.target.value)}
                      value={currentQty}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num}>{num}</option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <hr />
                <div className="flex mt-5">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${price * currentQty}
                  </span>
                  <button
                    disabled={isAddedToCart}
                    onClick={addToCart}
                    className={`flex ml-auto ${
                      isAddedToCart
                        ? `opacity-60 cursor-not-allowed`
                        : `focus:outline-none hover:bg-blue-600`
                    } text-white bg-blue-500 border-0 py-2 px-6  rounded`}
                  >
                    {`Add${isAddedToCart ? "ed" : ""} to cart`}
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { product } = await graphCms.request(
    gql`
      query ProductPageQuery($slug: String!) {
        product(where: { slug: $slug }) {
          id
          name
          brand
          price
          slug
          description
          images {
            url
            width
            height
          }
        }
      }
    `,
    { slug }
  );

  return {
    props: { product },
  };
};

export const getStaticPaths = async () => {
  const { products } = await graphCms.request(
    gql`
      {
        products {
          id
          slug
        }
      }
    `
  );

  return {
    paths: products.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

export default Product;
