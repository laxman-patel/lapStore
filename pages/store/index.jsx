import { gql } from "graphql-request";
import React from "react";
import Layout from "../../components/Layout";
import graphCms from "../../lib/graphcms";
import ProductCard from "../../components/ProductCard";

const Store = ({ products }) => {
  return (
    <>
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {products.map(({ id, ...product }) => {
                return <ProductCard key={id} {...product} />;
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const { products } = await graphCms.request(gql`
    {
      products {
        id
        name
        brand
        price
        slug
        images {
          url
          width
          height
        }
      }
    }
  `);

  return {
    props: { products },
  };
};

export default Store;
