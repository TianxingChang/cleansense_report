import "../styles/Card_page.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CleanCard from "./CleanCard";

export default function CardPage() {
  const [on, setOn] = useState(false);

  const [showText, setShowText] = useState("Done");

  const location = useLocation();
  const id = location.state ? location.state.job : null;
  const toilet_id = id[0];
  const [cardStyle, setCardStyle] = useState(
    localStorage.getItem(toilet_id + "_card")
      ? localStorage.getItem(toilet_id + "_card")
      : "cleaning_card"
  );

  const new_id = id.slice(1);
  const card_list = new_id.map((id) => (
    <CleanCard job={id} cardStyle={cardStyle} />
  ));
  const handleClick = () => {
    setOn((on) => !on);
    const new_style =
      cardStyle === "cleaning_card" ? "cleaning_card2" : "cleaning_card";
    console.log("new:", new_style);
    setShowText((text) => (text === "Done" ? "&#x2713" : "Done"));
    localStorage.setItem(toilet_id + "_card", new_style);
    setCardStyle(new_style);

    // send http
  };
  return (
    <div className="CardPage">
      <div className="page-container">
        {/* <div className="header">{toilet.id}</div> */}
        <div className="header">
          <Link to="/" state={{ isOn: on, id: toilet_id }}>
            <button class="arrow-button">
              <div class="arrow-button arrow-button--l"></div>
            </button>
          </Link>
          <h1>{id[0]}</h1>
          <div className="Place-holder">a</div>
        </div>
        <div>Just DO IT</div>

        {card_list}
        <button class="button-with-icon">
          <div class="button-with-icon__label" onClick={handleClick}>
            <div dangerouslySetInnerHTML={{ __html: showText }}></div>
          </div>
        </button>
      </div>
    </div>
  );
}
