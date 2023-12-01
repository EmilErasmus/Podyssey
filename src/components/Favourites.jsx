import { useState } from "react";
import "../styles/Favourites.css";
import FaveFilters from "./FaveFilters";

export default function Favourites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  const handleRemoveFavourite = (index) => {
    const updatedFavorites = [...filteredFavorites];
    updatedFavorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFilteredFavorites(updatedFavorites);
  };

  const handleFaveFilter = (event) => {
    const filterType = event.target.innerText;
  
    if (filterType === 'All') {
      setFilteredFavorites(favorites);
    } else if (filterType === 'A-Z') {
      setFilteredFavorites([...filteredFavorites].sort((a, b) => a.showTitle.localeCompare(b.showTitle)));
    } else if (filterType === 'Z-A') {
      setFilteredFavorites([...filteredFavorites].sort((a, b) => b.showTitle.localeCompare(a.showTitle)));
    } else if (filterType === 'Newest') {
      setFilteredFavorites([...filteredFavorites].sort((a, b) => new Date(b.seasonUpdated) - new Date(a.seasonUpdated)));
    } else if (filterType === 'Oldest') {
      setFilteredFavorites([...filteredFavorites].sort((a, b) => new Date(a.seasonUpdated) - new Date(b.seasonUpdated)));
    } else {
      setFilteredFavorites(favorites);
    }
  };
  

  const groupedFavorites = groupByShowTitle(filteredFavorites);
  console.log(groupedFavorites);
  return (
    <div className="favourites">
      <h2 className="favourites__header">Your Favorites</h2>
      <FaveFilters handleFaveFilter={handleFaveFilter} />
      <ul>
        {groupedFavorites.map((group, groupIndex) => (
          <li key={groupIndex} className="favourites__group">
            <h3>{group.showTitle}</h3>
            <h4>{group.seasonUpdated}</h4>
            <ul>
              {group.episodes.map((fav, index) => (
                <li key={index} className="favourites__list">
                  {/* Render information about the favorite episode */}
                  {fav.episodeTitle} (Added: {fav.addedDate})
                  <button
                    onClick={() => handleRemoveFavourite(fav.originalIndex)}
                    className="favourites__btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Helper function to group favorites by show title
const groupByShowTitle = (favorites) => {
  const grouped = {};
  favorites.forEach((fav, index) => {
    if (!grouped[fav.showTitle]) {
      grouped[fav.showTitle] = { showTitle: fav.showTitle, episodes: [] };
    }
    grouped[fav.showTitle].episodes.push({ ...fav, index });
  });
  return Object.values(grouped);
};
