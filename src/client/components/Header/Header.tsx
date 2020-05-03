import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const Header: FunctionComponent = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/news"> News</Link>
    </header>
  );
};

export default Header;
