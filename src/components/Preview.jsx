/* eslint-disable react/prop-types */
import "../styles/Preview.css";
import { Link } from "react-router-dom";
import formatDate from "../functions/formatDate";

export default function Preview(props) {
  return (
    <Link to={`/shows/${props.id}`}>
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
                Last updated: {formatDate(props.updated)}
              </p>
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </Link>
  );
}
