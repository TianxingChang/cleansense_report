import "../styles/Card.css";
export default function CleanCard({ job, cardStyle }) {
  return (
    <div className="Card">
      <button type="button" className="button1">
        <div className={cardStyle} style={{ borderRadius: "10px" }}>
          <h3>{job}</h3>
        </div>
      </button>
    </div>
  );
}
