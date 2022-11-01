import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  __deletePost,
  __hartPost,
  _ModalDetail,
} from "../redux/modules/postSlice";
import { __getPostDetail } from "../redux/modules/commentSlice";
import Comment from "./Comment";
import CommentList from "./CommentList";
import styled from "styled-components";
import Update from "../pages/Update";

const Post = (props) => {
  const dispatch = useDispatch();
  // const [posts, setPosts] = useState({});
  const posts = useSelector((state) => state.comment.post);
  const GETpost = useSelector((state) => state.post.post);
  // console.log("GETpost", GETpost);
  // console.log("props.POSTID", props.POSTID);
  // const [posts, setPosts] = useState(post);

  // const indexId = posts.findIndex((user) => {
  //   if (user.postId == props.POSTID) {
  //     return true;
  //   }
  //   return false;
  // });
  // console.log("indexId", indexId);
  // setPosts(GETpost[indexId]);
  // console.log("포스츠", posts);
  //상세보기 모달창 온오프
  const closeModalDetail = () => {
    dispatch(_ModalDetail(false));
  };

  //게시글 삭제
  const onPostDelete = (payload) => {
    dispatch(__deletePost(payload));
    dispatch(_ModalDetail(false));
  };
  //좋아요 버튼
  const onHartButton = (payload) => {
    dispatch(__hartPost(payload));
  };
  //업데이트 모달 선언
  const [modalUpdate, setModalUpdate] = useState(false);
  const showModalUpdate = () => {
    setModalUpdate(true);
  };

  //게시물 한개 데이터 GET(댓글포함)
  // useEffect(() => {
  //   console.log("posts", posts);
  //   // setPosts(post);
  // }, [posts]);
  // useEffect(() => {
  //   dispatch(__getPostDetail(props.POSTID));
  //   setPosts(DETAILpost);
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(__getPostDetail(props.POSTID));
  //   setPosts(DETAILpost);
  // }, [DETAILpost]);

  useEffect(() => {
    dispatch(__getPostDetail(props.POSTID));
  }, [dispatch]);
  return (
    <>
      <Background onClick={closeModalDetail}>
        <p>상세보기</p>
        <StModalDetailBT onClick={closeModalDetail}>X</StModalDetailBT>
        <StModalDetail onClick={(e) => e.stopPropagation()}>
          <Stlogin_box_Left_imgs>
            {posts.imgs &&
              posts.imgs.map((img, index) => {
                return <Stlogin_box_Left_img key={index} src={img} />;
              })}
          </Stlogin_box_Left_imgs>
          <Stlogin_box_Right>
            <div>
              <div>프로필 이미지</div>
              <div>{posts.name}</div>
              <div>
                <Button onClick={showModalUpdate}>수정하기</Button>
                {modalUpdate && (
                  <Update
                    POSTID={posts.postId}
                    setModalUpdate={setModalUpdate}
                  />
                )}
              </div>

              <Button
                onClick={() => {
                  onPostDelete(posts.postId);
                }}
              >
                삭제하기
              </Button>
            </div>

            <div>프로필 이미지</div>
            <div>{posts.name}</div>
            <div>{posts.contents}</div>

            <CommentList POSTID={posts.postId} />

            <div>
              <button onClick={() => onHartButton(posts.postId)}>하트</button>
              <button>댓글</button>
              <button>공유</button>
              <button>찜 우측정렬</button>
            </div>
            <div>좋아요 {posts.likeSize}개</div>
            <div>{posts.createdAt}</div>
            <Comment postId={posts.postId} />
          </Stlogin_box_Right>
        </StModalDetail>
      </Background>
    </>
  );
};

export default Post;

const Stlogin_box_Left_imgs = styled.div`
  width: 55%;
  height: 100%;
  color: #ffffff;
  position: fixed;
  background-position: center;
  background-size: cover;
`;
const Stlogin_box_Left_img = styled.img`
  width: 10%;
  height: 10%;
  color: #ffffff;
  position: fixed;
  background-position: center;
  background-size: cover;
`;

const Stlogin_box_Right = styled.div`
  margin-left: 45%;
  width: 55%;
  height: 100%;
  padding: 25px 25px;
  position: relative;
  background: linear-gradient(-45deg, #dcd7e0, #fff);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const StModalDetail = styled.div`
  /* 모달창을 화면 중앙. 최상단에 노출 */

  /* 모달창 크기 */
  width: 1000px;
  height: 800px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;

  /* 모달창 내부 X버튼 */
`;
const StModalDetailBT = styled.button`
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
