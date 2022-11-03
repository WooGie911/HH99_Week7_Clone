import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getPostDetail, _P_ID } from "../redux/modules/commentSlice";
import { _ModalDetail } from "../redux/modules/postSlice";
import Post from "./Post";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.post);

  //모달 온 함수 선언
  const showModalDetail = (payload) => {
    dispatch(_P_ID(payload));
    dispatch(__getPostDetail(payload));
    dispatch(_ModalDetail(true));
    console.log("클릭", payload);
  };

  //상세보기 페이지 모달 스토어에서 가져오기
  const ModalDetail = useSelector((state) => state.post.ModalDetail);
  console.log("ModalDetail", ModalDetail);

  return (
    <StPosts>
      {posts &&
        posts.map((post, index) => {
          return (
            <StPost key={index}>
              {ModalDetail && <Post />}
              <STBtn
                onClick={() => {
                  console.log("post.postId", post.postId);
                  showModalDetail(post.postId);
                }}
              >
                <div>
                  <img
                    src={post.imgs}
                    style={{
                      marginTop: "-20px",
                      width: "300px",
                      height: "300px",
                    }}
                  />
                  <text className="like">
                    ❤️{post.likeSize} - 💭{post.commentSize}
                  </text>
                </div>
              </STBtn>
            </StPost>
          );
        })}
    </StPosts>
  );
};

export default PostList;

const STBtn = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 500x;
  border-radius: 5px;
  padding-top: 20px;
  margin-top: 10px;
  background-color: rgba(247, 247, 247, 0.884);
  cursor: pointer;

  .like {
    display: none;
  }
  :hover {
    .like {
      display: block;
      padding: 5px 10px;
      background-color: #ffffff;
      opacity: 80%;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  /* :hover{
    //호버시 좋아요 보이기 기쁨님 도움!!!!
  } */
`;

const StPost = styled.div`
  padding: 10px;
`;
const StPosts = styled.div`
  margin-top: 100px;
  height: 100%;
  max-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-items: baseline;
  align-items: center;
  justify-content: start;
`;
