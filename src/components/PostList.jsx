import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";

const PostList = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  return (
    <>
      <div>PostList</div>

      {posts &&
        posts.map((post, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                navigate(`/Detail/${post.id}`);
              }}
            >
              <div>
                <img
                  src={post.image}
                  style={{
                    marginTop: "-20px",
                    width: "250px",
                    height: "250px",
                  }}
                />
                <div>
                  {post.goodCount} - {post.commentCount}
                </div>
              </div>
            </Button>
          );
        })}
    </>
  );
};

export default PostList;
