import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import store from "store2";
import Layout from "../components/Layout";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CartProduct = ({
  id,
  name,
  brand,
  price,
  qty,
  imgSrc,
  onQtyChange,
  updateCart,
}) => {
  const [currentQty, setCurrentQty] = useState(qty);

  useEffect(() => {
    const cart = store.get("cart") || [];

    let updatedCart = [...cart];

    updatedCart.forEach(item => {
      if (id === item.id) {
        item.qty = currentQty;
      }
    });

    store.set("cart", updatedCart, true);
    onQtyChange();
  }, [currentQty]);

  const removeItem = () => {
    const cart = store.get("cart") || [];

    let updatedCart = [...cart];

    updatedCart.forEach(item => {
      if (id === item.id) {
        const itemIdx = updatedCart.indexOf(item);

        if (itemIdx > -1) {
          updatedCart.splice(itemIdx, 1);
        }
      }
    });

    store.set("cart", updatedCart, true);
    updateCart();
    onQtyChange();
  };

  return (
    <>
      <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 rounded-lg">
        <div className="flex w-2/5 md:flex-row items-center flex-col">
          <div className="w-20">
            <Image className="" src={imgSrc} height="50" width="70" />
          </div>
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <div className="flex flex-col">
              <span className="text-sm">{name}</span>
              <span className="mt-1 text-gray-400 uppercase font-semibold text-xs">
                {brand}
              </span>
            </div>
            <a
              onClick={removeItem}
              className="font-semibold text-red-400 hover:text-red-600 text-xs"
            >
              Remove
            </a>
          </div>
        </div>
        <div className="flex justify-center w-1/5">
          <div className="relative">
            <select
              value={currentQty}
              onChange={e => setCurrentQty(e.target.value)}
              className="rounded border appearance-none border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm pr-8 pl-2 py-1"
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
        <span className="text-center w-1/5 text-sm">${price}</span>
        <span className="text-center w-1/5 text-sm">${price * currentQty}</span>
      </div>
    </>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  const calculateSubTotal = () => {
    let subTotalTmp = 0;

    const cart = store.get("cart") || [];

    cart.forEach(({ price, qty }) => {
      subTotalTmp += price * qty;
    });

    setSubTotal(subTotalTmp);
  };

  const checkout = async () => {
    setIsCheckoutDisabled(true);
    const stripe = await stripePromise;

    const { data: session } = await axios.post("/api/checkout", {
      cartItems: store.get("cart") || [],
    });

    store.clearAll();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    console.log({ session });
  };

  const updateCart = () => {
    const cart = store.get("cart");
    setCartItems(cart);
  };

  useEffect(() => {
    if (store.get("cart") && store.get("cart").length) {
      setIsCheckoutDisabled(false);
    } else {
      setIsCheckoutDisabled(true);
    }
  }, [cartItems]);

  useEffect(() => {
    updateCart();
    calculateSubTotal();
  }, []);

  return (
    <>
      <Layout>
        <div className="container mx-auto mt-10 md:flex">
          <div className="md:w-3/4 px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="text-2xl">
                {cartItems ? cartItems.length : 0} Item
                {cartItems && cartItems.length > 1 ? "s" : ""}
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-500 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold  text-gray-500 text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold  text-gray-500 text-xs uppercase w-1/5 text-center">
                Price
              </h3>
              <h3 className="font-semibold  text-gray-500 text-xs uppercase w-1/5 text-center">
                Total
              </h3>
            </div>
            {cartItems &&
              cartItems.map(props => (
                <CartProduct
                  {...props}
                  updateCart={updateCart}
                  onQtyChange={calculateSubTotal}
                />
              ))}
            <Link href="/store">
              <a className="flex text-blue-500 text-sm mt-10 underline hover:text-blue-600">
                &#8598; Continue Shopping
              </a>
            </Link>
          </div>
          <div className="md:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm ">Subtotal</span>
              <span className="font-semibold text-sm">${subTotal}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm ">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm rounded">
                <option>$10.00</option>
              </select>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${subTotal && subTotal + 10}</span>
              </div>
              <button
                onClick={checkout}
                disabled={isCheckoutDisabled}
                className={`bg-blue-500 rounded-full ${
                  isCheckoutDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                } font-semibold  py-3 text-sm text-white  w-full`}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
