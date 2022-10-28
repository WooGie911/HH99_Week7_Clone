import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost } from "../redux/modules/postSlice";

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramsid = useParams();
  const posts = useSelector((state) => state.post.post);

  const indexId = posts.findIndex((user) => {
    if (user.id == paramsid.id) {
      return true;
    }
    return false;
  });
  const [input, setInput] = useState(posts[indexId]);

  const onPostDelete = (payload) => {
    dispatch(__deletePost(payload));
  };

  return (
    <>
      <img
        src={input.image}
        style={{
          marginBottom: "24px",
          width: "400px",
          height: "400px",
        }}
      />
      <div>{input.userName}</div>
      <div>{input.content}</div>
      <Button
        onClick={() => {
          navigate("/Update");
        }}
      >
        수정하기
      </Button>
      <Button
        onClick={() => {
          onPostDelete(input.id);
          navigate("/Main");
        }}
      >
        삭제하기
      </Button>
    </>
  );
};

export default Post;
