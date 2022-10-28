import React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Layout from "../components/Layout";
import CommentList from "../components/CommentList";
const Detail = () => {
  return (
    <>
      <Layout>
        <Post />
        <CommentList />
        <Comment />
      </Layout>
    </>
  );
};

export default Detail;
