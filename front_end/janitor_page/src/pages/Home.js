import { cloneElement, useEffect, useState } from "react";
import "../styles/App.css";
import Card from "./Card";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [toilet_list, setToiletList] = useState([
    ["lg1-a", "Deep Cleaning"],
    ["lg3-c", "floor cleaning", "Cubicle 1"],
    ["lg4-b", "Cubicle 2"],
    ["g-a", "Cubicle 3"],
  ]);

  const fetchData = async (userInput) => {
    try {
      axios.get("http://127.0.0.1:8000/cleaning_list").then((res) => {
        setToiletList(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toilet_list_init = [];
  const [style, setStyle] = useState("cleaning_card");
  const [id, setId] = useState(null);
  const location = useLocation();

  // useEffect(() => {
  //   const isOn = location.state ? location.state.isOn : null;

  //   const this_id = location.state ? location.state.id : null;

  //   if (isOn) {
  //     setStyle("cleaning_card2");
  //     if (this_id) {
  //       setId(this_id);
  //     }
  //   } else {
  //     setStyle("cleaning_card");
  //   }
  // }, [location.state]);

  const clean_card = toilet_list.map((toilet) => (
    <Card
      info={toilet}
      this_style={style}
      id={
        localStorage.getItem(toilet[0] + "_card")
          ? localStorage.getItem(toilet[0] + "_card")
          : "cleaning_card"
      }
    />
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cleaning List</h1>
      </header>
      <div className="info">
        <h3> </h3>
      </div>
      <div className="main">
        <div className="container">{clean_card}</div>
      </div>
    </div>
  );
}

// function CardWrapper({ card }) {
//   const location = useLocation();
//   const isOn = location.state ? location.state.isOn : null;
//   const id = isOn ? isOn[1] : null;

//   return cloneElement(card, { id: id });
// }
