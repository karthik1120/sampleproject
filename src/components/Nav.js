import React from "react";
import "./Navcss.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <div>Logo</div>
      </Link>
      <ul className="nav-items">
        <Link to="/about">
          <li>about</li>
        </Link>
        <Link to="/shop">
          <li>shop</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
