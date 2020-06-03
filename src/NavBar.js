import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import colors from "./colors";

const spin = keyframes`
  50% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
`;

export default function NavBar() {
  const [fontSize, setFontSize] = useState(16);

  const Button = styled.button`
    font-size: 18px;
    font-weight: bold;
    border-radius: 15px;

    &:hover {
      background-color: #eee;
      color: tomato;
    }
  `;

  return (
    <header
      css={css`
        background-color: ${colors.primary};
        padding: 15px;
        font-size: ${fontSize}px;
      `}
    >
      <Button onClick={() => setFontSize(fontSize + 5)}>🗚+</Button>
      <Button onClick={() => setFontSize(fontSize - 5)}>🗚-</Button>
      <ul>
        <li>
          <Link to="/">Adopt me!</Link>
          <span
            role="img"
            aria-label="logo"
            css={css`
              display: inline-block;
              font-size: 22px;
              animation: 4s ${spin} ease-in infinite;
            `}
          >
            🐶
          </span>
        </li>
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}
