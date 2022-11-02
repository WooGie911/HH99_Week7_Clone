import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { __getPost } from '../redux/modules/postSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import GlobalStyles from '../components/GlobalStyles';
import AddComment from '../components/AddComment';
import Comment from '../components/Comment';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post.post);
  console.log('유즈셀렉터', posts);

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  // //모달부분
  // const [showModal, setShowModal] = useState(false);
  // const openModal = () => {
  //   setShowModal((prev) => !prev);
  // };

  return (
    <StWrapper>
      {posts.map((item) => {
        return (
          <div key={item.id}>
            <StPicList src={item.imgs} />
            <h2> {item.contents}</h2>
          </div>
        );
      })}
    </StWrapper>
  );
};

export default Main;

/* <StContainer>
<StButton onClick={openModal}>i'm a modal</StButton>
<Modal showModal={showModal} setShowModal={setShowModal} />
<GlobalStyles />
</StContainer> */

const StWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: #fafafa;
  justify-content: center;
  align-items: center;
`;

const StPicList = styled.img`
  width: 470px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 30px;
  position: relative;
  box-shadow: 0px 0px 1px 0px;
`;

//--------------

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const StButton = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;
