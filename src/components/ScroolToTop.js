import React, { useState, useEffect, Fragment } from "react";
import styled, { keyframes } from "styled-components";

const Blink = keyframes`
0%{
    opacity: 0;
}
100%{
    opacity: 1;
}
`;

const StyledButton = styled.div`
  position: fixed;
  margin-right: 50px;
  cursor: pointer;
  bottom: 30px;
  right: 0;
  z-index: 0;
  text-align: center;
  height: 45px;
  line-height: 46px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  border: 1px solid black;
  border-radius: 3px;
  padding: 0px 15px;
  animation: ${Blink} 1s ease-out;
`;

export const ScroolToTop = () => {
  const [interValId, setInterValId] = useState(0);
  const [thePosition, setThePosition] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        setThePosition(true);
      } else {
        setThePosition(false);
      }
    });
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    let intervalId = setInterval(() => {
      if (window.pageYOffset === 0) {
        clearInterval(intervalId);
      }
      window.scroll(0, window.pageYOffset - 100);
    }, 30);
    setInterValId(intervalId);
  };

  const renderGotoTopIcon = () => {
    if (thePosition) {
      return (
        <Fragment>
          <StyledButton onClick={scrollToTop}> top</StyledButton>
        </Fragment>
      );
    }
  };

  return <div>{renderGotoTopIcon()}</div>;
};
