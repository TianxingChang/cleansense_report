import "../styles/App.css";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   createRoutesFromElements,
// } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import CardPage from "./Card_page";
// import RootLayout from "../layout/RootLayout";

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>Cleaning List</h1>
  //     </header>
  //     <div className="info">
  //       <h3> </h3>
  //     </div>
  //     <div className="main">
  //       <div className="container">
  //         <Card />
  //         <Card />
  //         <Card />
  //         <Card />
  //         <Card />
  //         <Card />
  //         {/* <div className="card">{renderList(sortedArray)}</div> */}
  //       </div>
  //     </div>
  //   </div>
  // );
  // return <RouterProvider router={router}></RouterProvider>;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/CardPage" element={<CardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
