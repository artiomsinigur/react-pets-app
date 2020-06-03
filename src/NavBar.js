import React from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";

export default function NavBar() {
  return (
    <header
      css={css`
        background-color: #333;
        padding: 15px;
      `}
    >
      <ul>
        <li>
          <Link to="/">Adopt me!</Link>
          <span role="img" aria-label="logo">
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
