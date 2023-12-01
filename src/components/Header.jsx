/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/Header.css";
import SearchBar from "./SearchBar.jsx";

export default function Header(props) {


  const imageUrl = 'https://podyssey.netlify.app/spartan.png'
  return (
    <header>
      <div className="hero">
        <Link className="hero__link" to="/shows">
          <img src={imageUrl} className="hero__photo" />
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

// const imageUrl = `https://your-netlify-site-url/.netlify/large-media/images/example.jpg?nf_resize=fit&w=400`;

// return <img src={imageUrl} alt="Example" />;