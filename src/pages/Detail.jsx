import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Layout from "../components/Layout";

const Detail = () => {
  return (
    <>
      <Layout>
        <Post />

        <Comment />
      </Layout>
    </>
  );
};

export default Detail;
