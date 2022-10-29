import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost, __hartPost } from "../redux/modules/postSlice";
import CommentList from "../components/CommentList";

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramsid = useParams();
  const posts = useSelector((state) => state.post.post);

  const indexId = posts.findIndex((user) => {
    if (user.postId == paramsid.id) {
      return true;
    }
    return false;
  });
  const [input, setInput] = useState(posts[indexId]);

  const onPostDelete = (payload) => {
    dispatch(__deletePost(payload));
  };

  const onHartButton = (payload) => {
    dispatch(__hartPost(payload));
  };

  return (
    <>
      <img
        src={input.img}
        style={{
          marginBottom: "24px",
          width: "400px",
          height: "400px",
        }}
      />

      <div>
        <div>프로필 이미지</div>
        <div>{input.name}</div>

        <Button
          onClick={() => {
            navigate("/Update");
          }}
        >
          수정하기
        </Button>
        <Button
          onClick={() => {
            onPostDelete(input.postId);
            navigate("/Main");
          }}
        >
          삭제하기
        </Button>
      </div>

      <div>프로필 이미지</div>
      <div>{input.name}</div>
      <div>{input.content}</div>

      <CommentList />

      <div>
        <button onClick={() => onHartButton(input.postId)}>하트</button>
        <button>댓글</button>
        <button>공유</button>
        <button>찜 우측정렬</button>
      </div>
      <div>좋아요 {input.likeSize}개</div>
      <div>{input.createdAt}</div>
    </>
  );
};

export default Post;
