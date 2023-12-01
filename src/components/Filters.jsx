/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/Filters.css";

export default function Filters(props) {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
    // console.log(selectedGenre)
    props.handleGenreUpdate(selectedGenre);
  };

  return (
    <div className="filter">
      <button className="filter__btn" onClick={props.handleFilter}>All</button>
      <button className="filter__btn" onClick={props.handleFilter}>A-Z</button>
      <button className="filter__btn" onClick={props.handleFilter}>Z-A</button>
      <button className="filter__btn" onClick={props.handleFilter}>Newest</button>
      <button className="filter__btn" onClick={props.handleFilter}>Oldest</button>

      <select className="filter__dropdown" value={selectedGenre} onChange={handleGenreChange}>
        <option defaultValue style={{ display: 'none' }} value="All">All Genres</option>
        {props.genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
