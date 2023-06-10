import "./styles/App.css";
import CardZone from "./components/CardZone";

import Logo from "./assets/images/isd.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Scanner from "./pages/Scanner";
import SearchPage from "./pages/SearchPage";
import Setting from "./pages/Setting";
import GuidePage from "./pages/GuidePage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/Guidepage">GUIDE</Link> */}

        <Routes>
          <Route exact path="/" element={<CardZone />} />
          <Route path="/Scanner" element={<Scanner />} />
          <Route path="/SearchPage" element={<SearchPage />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/GuidePage" element={<GuidePage />} />
        </Routes>

        <footer>
          <a
            href="https://hkust.edu.hk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Logo} className="logo" alt="Logo" />
          </a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
