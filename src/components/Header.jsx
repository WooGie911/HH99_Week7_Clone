import React from "react";
import Button from "./elements/Button";
import Hlogo from "./icons/홈 로고.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 하트 from "./icons/하트.png";
import compass from "./icons/메인 혹은 쇼츠 로고.png";
import upload12 from "./icons/게시물 작성 온오프.png";
import homeClick from "./icons/홈 클릭시.png";
import Userlogo from "./icons/프로필.PNG";
import search from "./icons/검색하기.png";

const Header = (props) => {
  const navigate = useNavigate();
  const onClickHandler = async () => {
    const accessToken = localStorage.getItem("Access_Token");
    const refreshToken = localStorage.getItem("Refresh_Token");
    const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/logout`, {
      headers: {
        Authorization: accessToken,
        RefreshToken: refreshToken,
        "Cache-Control": "no-cache",
      },
    });
    // console.log(data);
    alert(data.data);
    localStorage.clear();
    window.location.replace("/");
  };

  const showModalWrite = () => {
    props.setModalWrite(true);
  };
  return (
    <>
      <DIIV>
        <StheaderWrap>
          <StMenuHead>
            <StMenuH>
              <STImg
                src={Hlogo}
                onClick={() => {
                  navigate("/Main");
                }}
              />
            </StMenuH>
            <StMenuC>
              <STSave
                src={homeClick}
                onClick={() => {
                  navigate("/Main");
                }}
              />
              <STCOM
                onClick={() => {
                  navigate("/Main");
                }}
              >
                {" "}
                홈
              </STCOM>
            </StMenuC>
            <StMenuC>
              <STSave src={search} />
              <STCOM> 검색</STCOM>
            </StMenuC>
            <StMenuC>
              <STSave src={upload12} onClick={showModalWrite} />
              <STCOM onClick={showModalWrite}> 글쓰기</STCOM>
            </StMenuC>
            <StMenuC>
              <STShare src={compass} />
              <STCOM> 탐색 탭</STCOM>
            </StMenuC>
            <StMenuC>
              <STComment src={하트} />
              <STCOM> 알림</STCOM>
            </StMenuC>
          </StMenuHead>
          <StMenuL>
            <STLogout src={Userlogo} onClick={onClickHandler} />
            <STCOM onClick={onClickHandler}>
              <strong>LOGOUT</strong>
            </STCOM>
          </StMenuL>
        </StheaderWrap>
      </DIIV>
    </>
  );
};

export default Header;
const DIIV = styled.div`
  position: fixed;
  top: 0;
  width: 10%;
`;
const StheaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
`;

const StMenuHead = styled.div`
  width: 100%;
  height: 80%;
`;
const StMenuH = styled.div`
  width: 90%;
  display: flex;
  position: relative;
  align-items: center;
  align-content: center;
  left: 10px;
  height: 13%;
  margin-bottom: 20%;
`;
const StMenuC = styled.div`
  margin-left: 15px;
  padding-left: 10px;
  display: flex;
  position: relative;
  align-items: center;
  align-content: center;
  height: 6%;
`;
const StMenuL = styled.div`
  margin-left: 15px;
  display: flex;
  position: relative;
  align-items: center;
  align-content: center;
  height: 10%;
`;

const STImg = styled.img`
  cursor: pointer;
  width: 100%;
  height: 100px;
`;

const STComment = styled.img`
  width: 27px;
  height: 27px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
  margin-left: 7px;
`;

const STShare = styled.img`
  margin-left: 7px;
  width: 25px;
  height: 25px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
`;

const STSave = styled.img`
  margin-left: 7px;
  width: 25px;
  height: 25px;
  border: 0 solid transparent;
  background-color: transparent;

  cursor: pointer;
`;
const STCOM = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

const STLogout = styled.img`
  width: 30px;
  height: 30px;
  border: 0 solid transparent;
  background-color: transparent;
  cursor: pointer;
  margin-left: 7px;
`;
