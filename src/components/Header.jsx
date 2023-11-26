/* eslint-disable react/prop-types */
import "../styles/Header.css";
import SearchBar from "./SearchBar.jsx";

export default function Header(props) {

  return (
    <header className="hero">
      <img src="../images/netflix.png" className="hero--photo" />
      <h1 className="hero--header">Notflix</h1>
      <SearchBar handleInput={props.handleInput} handleSearch={props.handleSearch} />
    </header>
  );
}
