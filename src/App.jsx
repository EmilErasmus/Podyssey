import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Show from "./components/Show.jsx";
import Landing from "./components/Landing.jsx";

export default function App() {
  const [previewData, setPreviewData] = useState([]);
  const [queryText, setQueryText] = useState("");
  /* 
  previewState represents what will be displayed on the page at any given time.
  Its determined by either previewData or queryText and is passed down into
  MainContent for display */
  const [previewState, setPreviewState] = useState(previewData);

  // Pull in data for the preview
  useEffect(() => {
    console.log("useEffect ran");
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => setPreviewData(data))
      .catch((err) => document.write(err + " data"));
  }, []);

  useEffect(() => {
    // Set previewState to previewData when it changes
    setPreviewState(previewData);
  }, [previewData]);

  let matchingTitleShows;

  const handleInput = (event) => {
    const input = event.target.value;
    setQueryText(input);
  };

  const handleSearch = () => {
    if (queryText) {
      matchingTitleShows = [...previewData].filter((book) =>
        book.title.toLowerCase().includes(queryText)
      );
      console.log(matchingTitleShows);
      setPreviewState(matchingTitleShows);
    } else {
      setPreviewState(previewData);
    }
  };

  return (
    <>
      <Header handleInput={handleInput} handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/shows"
          element={
            <MainContent
              previewState={previewState}
              setPreviewState={setPreviewState}
              previewData={previewData}
            />
          }
        />
        <Route path="/shows/:id" element={<Show />} />
      </Routes>
    </>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
