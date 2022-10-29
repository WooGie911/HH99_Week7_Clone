import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import PostList from "../components/PostList";

const Main = () => {
  return (
    <>
      <Layout>
        <Header />
        <PostList />
      </Layout>
    </>
  );
};

export default Main;
