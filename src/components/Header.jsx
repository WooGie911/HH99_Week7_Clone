import React from "react";
import Button from "./elements/Button";
import Hlogo from "./icons/홈 로고.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const onClickHandler = async () => {
    const accessToken = localStorage.getItem("Access_Token");
    const refreshToken = localStorage.getItem("Refresh_Token");
    const data = await axios.get(`http://13.124.38.31/api/logout`, {
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

  return (
    <>
      <STImg
        src={Hlogo}
        onClick={() => {
          navigate("/Main");
        }}
      />
      {/* <Button size="logout" color="logout">
        로그아웃
      </Button> */}
      <Button onClick={onClickHandler} size="logout" color="logout">
        로그아웃
      </Button>
    </>
  );
};

export default Header;

const STImg = styled.img`
  width: 100%;
  width: 100px;
  height: 50px;
  display: flex;
  flex-direction: column;
  //border-bottom-right-radius: 10px;
  //border-bottom-left-radius: 10px;

  /* padding-top: 0px; */
  /* margin-top: 100px; */
  margin-bottom: 100px;
  /* margin: auto; */
`;
