import Stripe from "stripe";
import { gql } from "graphql-request";

import graphCms from "../../lib/graphcms";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  const { cartItems } = req.body;

  const products = [];

  for (let i = 0; i < cartItems.length; i++) {
    const { id, qty } = cartItems[i];

    const { product } = await graphCms.request(
      gql`
        query getProductById($id: ID!) {
          product(where: { id: $id }) {
            id
            name
            price
          }
        }
      `,
      { id }
    );

    products.push({ product, qty: Number(qty) });
  }

  try {
    console.log({ products });
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success?id={CHECKOUT_SESSION_ID}",
      cancel_url: `http://localhost:3000/`,
      mode: "payment",
      payment_method_types: ["card"],
      line_items: products.map(({ product, qty }) => ({
        price_data: {
          unit_amount: product.price * 100,
          currency: "USD",
          product_data: {
            name: product.name,
          },
        },
        quantity: qty,
      })),
    });

    console.log({ session });

    return res.json(session);
  } catch (e) {
    return res.json({ error: { message: e } });
  }
};

export default handler;
