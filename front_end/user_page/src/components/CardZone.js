import "../styles/CardZone.css";
import { useState, useEffect } from "react";
import Collapsible from "./Collapsible";
import Topbar from "./TopBar";
import Infobar from "./InfoBar";
import Filter from "./Filter";
import axios from "axios";

export default function CardZone() {
  const [allToilet, setAllToilet] = useState([
    [3, ["LG1-b", { cub: 1, people: 3, hygiene: 17 }]],
    [4, ["LG4-a", { cub: 3, people: 0, hygiene: 5 }]],
    [5, ["LG4-b", { cub: 2, people: 1, hygiene: 8 }]],
    [6, ["G-a", { cub: 0, people: 5, hygiene: 25 }]],
    [8, ["LG1-a", { cub: 0, people: 5, hygiene: 11 }]],
    [16, ["G-b", { cub: 0, people: 12, hygiene: 18 }]],
  ]);
  const fetchData = async (userInput) => {
    try {
      axios.get("http://127.0.0.1:8000/user/4" + userInput).then((res) => {
        setAllToilet(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const fetchData = async () => {
    // const response = await fetch("http://20.24.98.15:8000/current");
    // const response = await fetch("http://127.0.0.1:8000/user/2");

    // const fetchData = async (userInput) => {
    //   try {
    //     axios.get("http://127.0.0.1:8000/user/" + userInput).then((res) => {
    //       setAllToilet(res.data);
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchData();
    // setInterval(console.log("get:   ", allToilet), 2000);
    // };
    fetchData();
  }, []);

  const renderCardZone = (allToilet) => {
    return allToilet.map((toilet) => {
      return <Collapsible Array={toilet} />;
    });
  };

  return (
    <>
      <Topbar fetchData={fetchData} />
      <h1 className="title"> Toilets List: </h1>
      <Filter />
      <Infobar />
      <div className="card_zone">
        <div className="card_container">{renderCardZone(allToilet)}</div>
      </div>
    </>
  );
}
