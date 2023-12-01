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
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShowDeets(data);
        // Set the initial selected season to the first one
        setSelectedSeason(data.seasons[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const handleAudioPlaying = () => {
      setAudioPlaying(true);
    };

    const handleAudioPaused = () => {
      setAudioPlaying(false);
    };

    window.addEventListener("play", handleAudioPlaying);
    window.addEventListener("pause", handleAudioPaused);

    return () => {
      window.removeEventListener("play", handleAudioPlaying);
      window.removeEventListener("pause", handleAudioPaused);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (audioPlaying) {
        const message = "You have audio playing. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [audioPlaying]);

  const handleSeasonClick = (season) => {
    // Toggle between seasons when clicked
    setSelectedSeason(season === selectedSeason ? null : season);
  };

  const handleAddToFavorites = (episode) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(showDeets)
    const episodeToAdd = {
      showTitle: showDeets.title,
      seasonUpdated: showDeets.updated,
      seasonTitle: selectedSeason.title,
      episodeTitle: episode.title,
      addedDate: new Date().toLocaleString(),
      // Add other relevant details
    };
    console.log(episodeToAdd.addedDate)
    const isAlreadyInFavorites = favorites.some(
      (fav) =>
        fav.showTitle === episodeToAdd.showTitle &&
        fav.seasonUpdated === episodeToAdd.seasonUpdated &&
        fav.seasonTitle === episodeToAdd.seasonTitle &&
        fav.episodeTitle === episodeToAdd.episodeTitle
    );
  
    if (!isAlreadyInFavorites) {
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
                            addToFavorites={() => handleAddToFavorites(episode)}
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
