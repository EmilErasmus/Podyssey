import "../styles/landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Link to="/shows">
      <div className="landing">
        <h2>To shows</h2>
      </div>
    </Link>
  );
}
