import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import formatDate from "../functions/formatDate";
import "../styles/Show.css";
import FavouritesButton from "./FavouritesButton";

import uuid from 'react-uuid';


export default function Show() {
  const { id } = useParams();
  const [showDeets, setShowDeets] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setShowDeets(data);
        // Set the initial selected season to the first one
        setSelectedSeason(data.seasons[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSeasonClick = (season) => {
    // Toggle between seasons when clicked
    setSelectedSeason(season === selectedSeason ? null : season);
  };

  const handleAddToFavorites = () => {
    // console.log(selectedSeason)
    // console.log('faves button working')
    // Implement the logic to add the episode to the Favorites list in local storage
    // Use showDeets and selectedSeason to get information about the current episode
    // You may want to store Favorites as an array of objects in local storage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const episodeToAdd = {
      // Add necessary information about the episode
      // You can customize this based on your requirements
      title: selectedSeason.title,
      episodeTitle: selectedSeason.episodes[0].title,
      // Add other relevant details
    };

    // Check if the episode is not already in favorites
    const isAlreadyInFavorites = favorites.some(
      (fav) =>
        fav.title === episodeToAdd.title &&
        fav.episodeTitle === episodeToAdd.episodeTitle
    );

    if (!isAlreadyInFavorites) {
      // Add the episode to the favorites list
      favorites.push(episodeToAdd);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <div className="show">
      {showDeets.image ? (
        <>
          <div className="container">
            <div className="show__sidebar">
              <h3>Seasons</h3>
              <ul>
                {showDeets.seasons.map((season) => (
                  <li
                    key={season.season}
                    className={selectedSeason === season ? "selected" : ""}
                    onClick={() => handleSeasonClick(season)}
                  >
                    {season.season}: {season.title} ({season.episodes.length}{" "}
                    episodes)
                  </li>
                ))}
              </ul>
            </div>
            <div className="content">
              <div className="header">
                <img src={showDeets.image} alt={showDeets.title} />
                <div className="info">
                  <h1>{showDeets.title}</h1>

                  <p>{showDeets.genres ? showDeets.genres.join(", ") : " "}</p>
                  <p>Last Updated: {formatDate(showDeets.updated)}</p>
                </div>
              </div>
              <div className="episodes">
                {selectedSeason && (
                  <>
                    {selectedSeason.episodes.map((episode) => (
                      <div key={episode.title} className="episode">
                        <h3>
                          {episode.title}{" "}
                          <FavouritesButton
                            key={uuid()}
                            id={uuid()}
                            addToFavorites={handleAddToFavorites}
                          />
                        </h3>
                        <p>{episode.description}</p>
                        <audio controls>
                          <source src={episode.file} type="audio/mp3" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
        ) : (
          <h2>Loading...</h2>
        )}
    </div>
  );
}
