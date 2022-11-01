import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getPostDetail } from "../redux/modules/commentSlice";
import { _ModalDetail } from "../redux/modules/postSlice";
import Post from "../components/Post";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.post);

  //모달 온 함수 선언
  const showModalDetail = (payload) => {
    dispatch(__getPostDetail(payload));
    dispatch(_ModalDetail(true));
    console.log("클릭", payload);
  };

  //상세보기 페이지 모달 스토어에서 가져오기
  const ModalDetail = useSelector((state) => state.post.ModalDetail);
  console.log("ModalDetail", ModalDetail);

  return (
    <>
      {posts &&
        posts.map((post, index) => {
          return (
            <div key={index}>
              {ModalDetail && <Post POSTID={post.postId} />}
              <STBtn
                onClick={() => {
                  console.log("post.postId", post.postId);
                  showModalDetail(post.postId);
                }}
              >
                <div>
                  {post.imgs &&
                    post.imgs.map((img, INDEX) => {
                      return (
                        <img
                          key={INDEX}
                          src={img}
                          style={{
                            marginTop: "-20px",
                            width: "250px",
                            height: "250px",
                          }}
                        />
                      );
                    })}

                  <div>
                    {post.likeSize} - {post.commentSize}
                  </div>
                </div>
              </STBtn>
            </div>
          );
        })}
    </>
  );
};

export default PostList;

const STBtn = styled.div`
  border: 2px solid transparent;
  width: 80%;
  max-width: 250px;
  border: 3px solid #e4fcef;
  height: 500x;
  border-radius: 5px;
  padding-top: 20px;
  margin-top: 10px;
  background-color: #edfaf3;
  margin-left: 10px;
  float: right;
`;
