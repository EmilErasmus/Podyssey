/* eslint-disable react/prop-types */
// import Fuse from "fuse.js";
import Preview from "./Preview.jsx";
import Filters from "./Filters.jsx";
import Carousel from "./Carousel.jsx";
import "../styles/MainContent.css";


export default function MainContent(props) {
  const cards = props.previewState.map((item) => {
    return <Preview key={item.id} {...item} />;
  });

  const handleFilter = (event) => {
    const value = event.target.innerText;
    let sortedData;

    if (value === "A-Z") {
      sortedData = [...props.previewState].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (value === "Z-A") {
      sortedData = [...props.previewState].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if (value === "Newest") {
      sortedData = [...props.previewState].sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    } else if (value === "Oldest") {
      sortedData = [...props.previewState].sort(
        (a, b) => new Date(a.updated) - new Date(b.updated)
      );
    } else {
      // Handle other filters or default case here
      sortedData = [...props.previewData];
    }

    props.setPreviewState(sortedData);
  };
  return (
    <main>
      {console.log("MainContent renders")}
      <Carousel cards={cards}/>
      <Filters handleFilter={handleFilter} />
      <section className="list">
        {cards}
      </section>
    </main>
  );
}
