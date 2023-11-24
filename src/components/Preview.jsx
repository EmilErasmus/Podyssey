/* eslint-disable react/prop-types */
import "../styles/Preview.css";

export default function Preview(props) {
  console.log(props.updated)
  const humanReadableDate = new Date(props.updated).toLocaleDateString();
  return (
    <div className="list__button">
      {props.image ? (
        <div className="preview">
          <img
            className="preview__image"
            src={props.image}
            alt="super-epic-pic"
          />

          <div className="preview__info">
            <h3 className="preview__title">{props.title}</h3>
            <div className="preview__author">Seasons: {props.seasons}</div>
            <p className="preview_hidden" id="description">
              {props.description}
            </p>
            <p className="preview_date" id="date">
              Last updated: {humanReadableDate}
            </p>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
