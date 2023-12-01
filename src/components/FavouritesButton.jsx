
/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/FavouritesButton.css";

export default function FavouritesButton(props) {
  const [isChecked, setIsChecked] = useState(false);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    props.addToFavorites();
    console.log(props.id)
  };

  return (
    <button
      className={`fave ${isChecked ? "checked" : ""}`}
      // onClick={handleCheckboxChange}
    >
      <input
        value="favorite-button"
        name="favorite-checkbox"
        id={props.id}
        type="checkbox"
        className="favorite"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label className="fave__container" htmlFor={props.id}>
        <svg
          className="feather feather-heart"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <div className="fave__action">
          <span className="fave__option-1">Add to Favorites</span>
          <span className="fave__option-2">Added to Favorites</span>
        </div>
      </label>
    </button>
  );
}
