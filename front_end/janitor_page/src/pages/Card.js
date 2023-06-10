import { useState, ReactDOM, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

export default function Card({ info, this_style, id }) {
  console.log(info[0], id);
  if (!info) info = "haha";
  const [style, setStyle] = useState(id ? id : "cleaning_card");
  useEffect(() => {
    setStyle(id);
    console.log("style:", style);
  }, []);
  return (
    <div className="Card">
      <button type="button" className="button1">
        <Link className="link_route" to="/CardPage" state={{ job: info }}>
          <div className={style}>
            <h3>{info[0]}</h3>
          </div>
        </Link>
      </button>
    </div>
  );
}

// export default function Card({ info, this_style, id }) {
//   console.log(info[0], id);
//   if (!info) info = "haha";
//   const [style, setStyle] = useState("cleaning_card");
//   useEffect(() => {
//     if (this_style && id) {
//       setStyle(this_style);
//     }
//   }, [this_style, info, id]);
//   return (
//     <div className="Card">
//       <button type="button" className="button1">
//         <Link className="link_route" to="/CardPage" state={{ job: info }}>
//           <div className={style}>
//             <h3>{info[0]}</h3>
//           </div>
//         </Link>
//       </button>
//     </div>
//   );
// }
