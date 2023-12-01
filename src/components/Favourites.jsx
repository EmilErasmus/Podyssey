

export default function Favourites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(localStorage)
  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            {/* Render information about the favorite episode */}
            {fav.title} - {fav.episodeTitle}
          </li>
        ))}
      </ul>
    </div>
  );
}
