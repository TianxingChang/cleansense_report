import "../styles/Collapsible.css";
import { useState } from "react";
import Guide from "../assets/images/guide.png";
import { Link } from "react-router-dom";

export default function Collapsible(prop) {
  const time = prop.Array[0];
  const id = prop.Array[1][0]; // lg1-01
  const info = prop.Array[1][1]; // {cub:3, people:3, hygiene:'good'}

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="collapsible">
      <button type="button" className="button" onClick={toggle}>
        <div
          className="time_card"
          style={{
            backgroundColor: open ? "rgb(241, 231, 231)" : "black",
            borderRadius: open ? "10px 0 0 0" : "10px 0 0 10px",
            color: time >= 5 ? "red" : time ? "rgb(200,140,20)" : "green",
          }}
        >
          {time ? time + " min" : "Available"}
        </div>
        <div
          className="id_card"
          style={{ borderRadius: open ? "0 10px 0 0" : "10px" }}
        >
          {id}
        </div>
      </button>
      {open && (
        <div className="content">
          <div className="left-content">
            <div className="cub-num">
              <div className="cub">{info.cub}</div>
              <div className="info">cubicles left</div>
            </div>
            <div className="people-num">
              <div className="people">{info.people}</div>
              <div className="info">people inside</div>
            </div>
            <div className="report-num">
              <div className="hygiene">{info.hygiene}</div>
              <div className="info">hygiene level</div>
            </div>
          </div>
          <div className="right-content">
            <Link to="/GuidePage" className="link-guide">
              <img src={Guide} className="guide" alt="guide me" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
