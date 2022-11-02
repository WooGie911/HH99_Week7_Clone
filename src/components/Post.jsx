import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  __deletePost,
  __heartPost,
  _ModalDetail,
} from "../redux/modules/postSlice";
import { __getPostDetail } from "../redux/modules/commentSlice";
import Comment from "./Comment";
import CommentList from "./CommentList";
import Update from "../pages/Update";
import styled from "styled-components";
import Userlogo from "./icons/프로필.PNG";
import Commentlogo from "./icons/댓글.png";
import Sharelogo from "./icons/공유하기 랑 메시지.png";
import Savelogo from "./icons/북마크.png";

const Post = () => {
  const dispatch = useDispatch();
  const P_id = useSelector((state) => state.comment.P_ID);
  const posts = useSelector((state) => state.comment.post);

  //상세보기 모달창 온오프
  const closeModalDetail = () => {
    dispatch(_ModalDetail(false));
    window.location.replace("/Main");
  };

  //게시글 삭제
  const onPostDelete = (payload) => {
    dispatch(__deletePost(payload));
    dispatch(_ModalDetail(false));
    window.location.replace("/Main");
  };
  //좋아요 버튼
  const onheartButton = (payload) => {
    dispatch(__heartPost(payload));
  };
  //업데이트 모달 선언
  const [modalUpdate, setModalUpdate] = useState(false);
  const showModalUpdate = () => {
    setModalUpdate(true);
  };

  useEffect(() => {
    dispatch(__getPostDetail(P_id));
  }, [dispatch]);
  return (
    <>
      <Background onClick={closeModalDetail}>
        <StModalDetailBT onClick={closeModalDetail}>X</StModalDetailBT>
        <StModalDetail onClick={(e) => e.stopPropagation()}>
          <Stmodal_box_Left>
            <Stmodal_box_Left_img src={posts.img} />
          </Stmodal_box_Left>
          <Stmodal_box_Right>
            <div>
              <STUser src={Userlogo} />
              <span>{posts.name}</span>
              <button onClick={showModalUpdate}>수정하기</button>
              {modalUpdate && (
                <Update POSTID={posts.postId} setModalUpdate={setModalUpdate} />
              )}
              <button
                onClick={() => {
                  onPostDelete(posts.postId);
                }}
              >
                삭제하기
              </button>
            </div>

            <div>
              <STUser src={Userlogo} />
              {posts.name} {posts.contents}
              <CommentList POSTID={posts.postId} />
            </div>

            <div>
              <ButtonBox>
                <LikeButton onClick={() => onheartButton(posts.postId)}>
                  {posts.amILike ? "❤️" : "🤍"}
                </LikeButton>
                <STComment src={Commentlogo} />
                <STShare src={Sharelogo} />
                <STSave src={Savelogo} />
              </ButtonBox>

              <div>좋아요 {posts.likeSize}개</div>
              <div>{posts.createdAt}</div>
            </div>

            <div>
              <Comment postId={posts.postId} />
            </div>
          </Stmodal_box_Right>
        </StModalDetail>
      </Background>
    </>
  );
};

export default Post;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.185);
  z-index: 0;
  display: flex;
  flex-wrap: wrap;
`;

const StModalDetail = styled.div`
  /* 모달창 크기 */
  width: 1200px;
  height: 800px;
  /* 최상단 위치 */
  z-index: 999;
  /* 중앙 배치 */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 모달창 디자인 */
  background-color: gray;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
`;
const StModalDetailBT = styled.button`
  position: absolute;
  right: 50px;
  top: 30px;
  background-color: transparent;
  color: white;
  font-size: 50px;
  border: transparent;
`;

const Stmodal_box_Left_img = styled.img`
  width: 100%;
`;
const Stmodal_box_Left = styled.div`
  width: 60%;
  height: 100%;
  color: #ffffff;
  background-color: black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const Stmodal_box_Right = styled.div`
  width: 40%;
  height: 100%;
  background: #fff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const STUser = styled.img`
  width: 30px;
  height: 30px;
`;

const ButtonBox = styled.div`
  display: flex;
`;
const LikeButton = styled.button`
  width: 30px;
  height: 30px;
  border: transparent;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  bottom: 5px;
`;

const STComment = styled.img`
  width: 20px;
  height: 20px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
`;

const STShare = styled.img`
  margin-left: 3px;
  width: 20px;
  height: 20px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
`;

const STSave = styled.img`
  margin-left: 3px;
  width: 20px;
  height: 20px;
  border: 0 solid transparent;
  background-color: transparent;
  position: relative;
  right: 10px;
  cursor: pointer;
`;
