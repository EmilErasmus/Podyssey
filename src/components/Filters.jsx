/* eslint-disable react/prop-types */
import "../styles/Filters.css";

export default function Filters(props) {
  return (
    <div className="filter">
      <button className="filter__btn" onClick={props.handleFilter}>All</button>
      <button className="filter__btn" onClick={props.handleFilter}>A-Z</button>
      <button className="filter__btn" onClick={props.handleFilter}>Z-A</button>
      <button className="filter__btn" onClick={props.handleFilter}>Newest</button>
      <button className="filter__btn" onClick={props.handleFilter}>Oldest</button>
    </div>
  );
}
