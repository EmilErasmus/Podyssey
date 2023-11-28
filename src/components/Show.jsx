import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import formatDate from "../functions/formatDate";
import "../styles/Show.css";

export default function Show() {
  const { id } = useParams();
  const [showDeets, setShowDeets] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

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

  const handleSeasonClick = (season) => {
    // Toggle between seasons when clicked
    setSelectedSeason(season === selectedSeason ? null : season);
  };

  return (
    <div className="show">
      {showDeets.image && (
        <>
          <div className="container">
            <div className="sidebar">
              <h3>Seasons</h3>
              <ul>
                {showDeets.seasons.map((season) => (
                  <li
                    key={season.season}
                    className={selectedSeason === season ? 'selected' : ''}
                    onClick={() => handleSeasonClick(season)}
                  >
                    {season.season}: {season.title} ({season.episodes.length} episodes)
                  </li>
                ))}
              </ul>
            </div>
            <div className="content">
              <div className="header">
                <img src={showDeets.image} alt={showDeets.title} />
                <div className="info">
                  <h1>{showDeets.title}</h1>
                  
                  <p>{showDeets.genres.join(", ")}</p>
                  <p>Last Updated: {formatDate(showDeets.updated)}</p>
                </div>
              </div>
              <div className="episodes">
                {selectedSeason && (
                  <>
                    {selectedSeason.episodes.map((episode) => (
                      <div key={episode.title} className="episode">
                        <h3>{episode.title}</h3>
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
      )}
    </div>
  );
}
