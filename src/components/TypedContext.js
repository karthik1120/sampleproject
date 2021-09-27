import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Blink = keyframes`
	50% { opacity: 0; }
`;

const StyledCursor = styled.span`
  font-size: 40px;
  text-transform: capitalize;
  ::after {
    content: " |";
    color: black;
    animation: ${Blink} 0.5s step-start infinite;
  }
`;

const superpower = [
  "logical thinking ",
  "Developing ",
  "Playing ",
  "entrepreneurship ",
];
const Phase = {
  TYPING: "TYPING",
  PAUSING: "PAUSING",
  DELETING: "DELETING",
};

const useTypedContext = (superpower) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [typedSuperPower, setTypedSuperPower] = useState("");
  const [phase, setPhase] = useState(Phase.TYPING);
  useEffect(() => {
    switch (phase) {
      case Phase.TYPING: {
        const Value = superpower[selectedIndex].slice(
          0,
          typedSuperPower.length + 1
        );

        if (Value === typedSuperPower) {
          const timeTyped = setTimeout(() => {
            setPhase(Phase.PAUSING);
          }, 1500);
          return () => clearTimeout(timeTyped);
        }

        const timeTyped = setTimeout(() => {
          setTypedSuperPower(Value);
        }, 100);
        return () => clearTimeout(timeTyped);
      }
      case Phase.DELETING: {
        if (!typedSuperPower) {
          let nextInd = selectedIndex + 1;
          setSelectedIndex(superpower[nextInd] ? nextInd : 0);
          setPhase(Phase.TYPING);
          return;
        }

        const Value = superpower[selectedIndex].slice(
          0,
          typedSuperPower.length - 1
        );
        const timeTyped = setTimeout(() => {
          setTypedSuperPower(Value);
        }, 30);
        return () => clearTimeout(timeTyped);
      }
      // case Phase.PAUSING:
      default:
        const timeTyped = setTimeout(() => {
          setPhase(Phase.DELETING);
        }, 100);
        return () => clearTimeout(timeTyped);
    }
  }, [typedSuperPower, phase]);

  return typedSuperPower;
};

const TypedContext = () => {
  const typingContext = useTypedContext(superpower);
  return <StyledCursor>{typingContext}</StyledCursor>;
};

export default TypedContext;
