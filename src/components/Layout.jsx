import React from "react";
import styled, { css } from "styled-components";

const Layout = (props) => {
  return <StLayout>{props.children}</StLayout>;
};

export default Layout;

const StLayout = styled.div`
  max-width: 100%;
  min-width: 800px;
  /* margin: 50px auto;
  border-radius: 8px; */
  /* background-color: white; */
`;
