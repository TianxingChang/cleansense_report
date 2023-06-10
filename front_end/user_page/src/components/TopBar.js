import "../styles/TopBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import SettingIcon from "../assets/images/account-settings.svg";
import ScannerIcon from "../assets/images/scan.svg";

export default function TopBar({ fetchData }) {
  const [searchValue, setSearchValue] = useState("");

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     handleSubmit();
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(searchValue);
    setSearchValue("");
    // Do something with the search value
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="searchbar">
      <div className="input-text">
        <form onSubmit={handleSubmit}>
          <input
            className="input-window"
            type="text"
            placeholder="Type your location"
            // onKeyDown={handleKeyDown}
            value={searchValue}
            // onSubmitEditing={handleSubmit}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <button className="qr-button">
        <Link to="/Scanner" className="scanner-link">
          <img
            src={ScannerIcon}
            className="scanner-icon"
            alt="account setting"
          />
        </Link>
      </button>
      <Link to="/Setting" className="account">
        <button className="account-button">
          <img
            src={SettingIcon}
            className="account-setting"
            alt="account setting"
          />
        </button>
      </Link>
    </div>
  );
}
