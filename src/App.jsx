import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import Fuse from "fuse.js";
import Header from "./components/Header.jsx";
import MainContent from "./components/MainContent.jsx";
import Show from "./components/Show.jsx";
import Landing from "./components/Landing.jsx";
import Favourites from "./components/Favourites.jsx";
import Sidebar from "./components/SideBar.jsx";
// import '../styles/App.css';


export default function App() {
  const [previewData, setPreviewData] = useState([]);
  const [queryText, setQueryText] = useState("");
  /* 
  previewState represents what will be displayed on the page at any given time.
  Its determined by either previewData or queryText and is passed down into
  MainContent for display */
  const [previewState, setPreviewState] = useState(previewData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      // Use Fuse.js for fuzzy searching
      const options = {
        keys: ["title"], // Specify the fields you want to search
        includeScore: true,
      };
      const fuse = new Fuse(previewData, options);
      const fuzzyResults = fuse.search(queryText);
      
      // Extract only the items from the results (without the score)
      matchingTitleShows = fuzzyResults.map((result) => result.item);

      setPreviewState(matchingTitleShows);
    } else {
      setPreviewState(previewData);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header handleInput={handleInput} handleSearch={handleSearch} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
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
        <Route path="/favourites" element={<Favourites />} />
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
