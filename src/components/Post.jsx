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
          <St_Modal>
            <St_Modal_Ca>
              <div className="title">
                <a>상세보기</a>
              </div>
              <button className="TopBt" onClick={showModalUpdate}>
                수정
              </button>
              {modalUpdate && (
                <Update POSTID={posts.postId} setModalUpdate={setModalUpdate} />
              )}
              <button
                className="TopBt"
                onClick={() => {
                  onPostDelete(posts.postId);
                }}
              >
                삭제
              </button>
            </St_Modal_Ca>
            <St_Modal_BOX>
              <Stmodal_box_Left>
                <Stmodal_box_Left_img src={posts.img} />
              </Stmodal_box_Left>
              <Stmodal_box_Right>
                <StTop>
                  <STUser src={Userlogo} />
                  <span className="TopSp">{posts.name}</span>
                </StTop>

                <StContents>
                  <StContent>
                    <STUser src={Userlogo} />
                    <span className="TopSp">{posts.name}</span>
                    <span className="TopSp"> {posts.contents}</span>
                  </StContent>
                  <CommentList POSTID={posts.postId} />
                </StContents>

                <StButtons>
                  <ButtonBox>
                    <LikeButton onClick={() => onheartButton(posts.postId)}>
                      {posts.amILike ? "❤️" : "🤍"}
                    </LikeButton>
                    <STComment src={Commentlogo} />
                    <STShare src={Sharelogo} />
                    <STSave src={Savelogo} />
                  </ButtonBox>

                  <div className="H4">좋아요 {posts.likeSize}개</div>
                  <div className="H5">{posts.createdAt}</div>
                </StButtons>

                <StComment>
                  <Comment postId={posts.postId} />
                </StComment>
              </Stmodal_box_Right>
            </St_Modal_BOX>
          </St_Modal>
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
  height: 850px;
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
const St_Modal = styled.div`
  display: flex;
  flex-direction: column;
`;
const St_Modal_Ca = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  .title {
    flex-grow: 1;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    justify-items: center;
  }
  .TopBt {
    float: right;
    position: relative;
    right: 10px;
    border: transparent;
    border-radius: 10px;
    width: 100px;
    font-size: 20px;
    color: skyblue;
    background-color: transparent;
  }
`;
const St_Modal_BOX = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const Stmodal_box_Left_img = styled.img`
  width: 100%;
`;
const Stmodal_box_Left = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  width: 60%;
  height: 800px;
  color: #ffffff;
  background-color: black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const Stmodal_box_Right = styled.div`
  width: 40%;
  height: 800px;
  background: #fff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const StTop = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
  height: 50px;
  border-bottom: solid 1px;
  border-color: rgba(161, 157, 157, 0.534);
  border-bottom-left-radius: 4px;
  .TopSp {
    margin-left: 5px;
  }
`;
const StContents = styled.div`
  flex-grow: 1;
`;

const StContent = styled.div`
  display: flex;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 5px;
  margin-left: 3px;
  .TopSp {
    margin-left: 5px;
  }
`;
const StButtons = styled.div`
  padding-top: 5px;
  padding-bottom: 8px;
  border-top: solid 1px;
  border-color: rgba(161, 157, 157, 0.534);
  .H4 {
    font-size: 12px;
  }
  .H5 {
    font-size: 10px;
  }
`;
const StComment = styled.div`
  display: flex;
  height: 50px;
  border-top: solid 1px;
  border-color: rgba(161, 157, 157, 0.534);
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
  position: absolute;
  right: 10px;
  cursor: pointer;
`;
