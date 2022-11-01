import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import PostList from "../components/PostList";

import { useNavigate } from "react-router-dom";
import Write from "./Write";
import { useDispatch } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";

const Main = () => {
  const navigate = useNavigate();
  //작성 페이지 모달 스테이트 선언
  const [modalWrite, setModalWrite] = useState(false);
  const showModalWrite = () => {
    setModalWrite(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Header />

        <div>
          <button onClick={showModalWrite}>글쓰기 모달</button>
          {modalWrite && <Write setModalWrite={setModalWrite} />}
        </div>
        {/* <div>
          <button onClick={showModal}>글쓰기</button>
          {modalOpenWrite && <Write setModalOpen={setModalOpen} />}
        </div> */}
        <PostList />
      </Layout>
    </>
  );
};

export default Main;
