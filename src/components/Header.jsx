import React from "react";
import Button from "./elements/Button";

const Header = () => {
  //   const onClickHandler = async () => {
  //     const accessToken = localStorage.getItem("Access_Token");
  //     const refreshToken = localStorage.getItem("Refresh_Token");
  //     await axios.get(`${process.env.REACT_APP_SERVER}/auth/logout`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         RefreshToken: refreshToken,
  //         "Cache-Control": "no-cache",
  //       },
  //     });
  //     localStorage.clear();
  //     window.location.replace("/");
  //   };

  return (
    <>
      <div>instagram 이미지 혹은 텍스트</div>
      <Button size="logout" color="logout">
        로그아웃
      </Button>
      {/* <Button onClick={onClickHandler} size="logout" color="logout">
        로그아웃
      </Button> */}
    </>
  );
};

export default Header;
