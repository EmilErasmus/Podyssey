/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/Header.css";
import SearchBar from "./SearchBar.jsx";

export default function Header(props) {
  return (
    <header>
      <div className="hero">
        <Link className="hero__link" to="/shows">
          <img src="../public/spartan.png" className="hero__photo" />
        </Link>
        <h1 className="hero__header">Podyssey</h1>
      </div>

      <SearchBar
        handleInput={props.handleInput}
        handleSearch={props.handleSearch}
      />
    </header>
  );
}
