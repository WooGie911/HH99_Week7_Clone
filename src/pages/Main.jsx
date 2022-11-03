import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import PostList from "../components/PostList";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";
import Write from "./Write";
const Main = () => {
  const dispatch = useDispatch();
  //작성 페이지 모달 스테이트 선언
  const [modalWrite, setModalWrite] = useState(false);

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <StMain>
          <div className="HD">
            <Header setModalWrite={setModalWrite} />
          </div>
          <StHomeLayout>
            <div>
              <PostList />
            </div>
          </StHomeLayout>
        </StMain>
      </Layout>
      <div>{modalWrite && <Write setModalWrite={setModalWrite} />}</div>
    </>
  );
};

export default Main;

const StMain = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(247, 247, 247, 0.884);
  height: 100%;
  .HD {
    width: 10%;
    height: 100%;
    border-right: solid 1px;
    border-color: rgba(161, 157, 157, 0.534);
  }
`;

const StHomeLayout = styled.div`
  background-color: rgba(247, 247, 247, 0.884);
  margin-left: 15%;
  max-width: 1200px;
  min-width: 600px;
  width: 1000px;
`;
