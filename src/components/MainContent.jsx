import { useState, useEffect } from "react";
import Preview from "./Preview.jsx";
import Filters from "./Filters.jsx";
import "../styles/MainContent.css";

export default function MainContent() {
  const [previewData, setPreviewData] = useState([]);

  // Pull in data for the preview
  useEffect(() => {
    console.log("useEffect ran");
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => setPreviewData(data))
      .catch((err) => document.write(err + " data"));
  }, []);

  const cards = previewData.map((item) => {
    return <Preview key={item.id} {...item} />;
  });

  const handleFilter = (event) => {
    const value = event.target.innerText;
    let sortedData;

    if (value === "A-Z") {
      sortedData = [...previewData].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (value === "Z-A") {
      sortedData = [...previewData].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else if (value === "Newest") {
      sortedData = [...previewData].sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (value === "Oldest") {
      sortedData = [...previewData].sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else {
      // Handle other filters or default case here
      sortedData = [...previewData];
    }

    setPreviewData(sortedData);
  };

  return (
    <main>
      {console.log("main renders")}
      <Filters handleFilter={handleFilter} />
      <section className="list">{cards}</section>
    </main>
  );
}
