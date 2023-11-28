/* eslint-disable react/prop-types */
import "../styles/Header.css";
import SearchBar from "./SearchBar.jsx";

export default function Header(props) {
  return (
    <header>
      <div className="hero">
        <img src="../images/spartan.png" className="hero--photo" />
        <h1 className="hero--header">Podyssey</h1>
      </div>
      <SearchBar
        handleInput={props.handleInput}
        handleSearch={props.handleSearch}
      />
    </header>
  );
}
