/* eslint-disable react/prop-types */
import "../styles/Filters.css";

export default function Filters(props) {

  return (
    <div className="filter">
      <button className="filter__btn" onClick={props.handleFaveFilter}>All</button>
      <button className="filter__btn" onClick={props.handleFaveFilter}>A-Z</button>
      <button className="filter__btn" onClick={props.handleFaveFilter}>Z-A</button>
      <button className="filter__btn" onClick={props.handleFaveFilter}>Newest</button>
      <button className="filter__btn" onClick={props.handleFaveFilter}>Oldest</button>
    </div>
  );
}