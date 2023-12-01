import "../styles/Landing.css";
import { Link } from "react-router-dom";

// import { supabase } from "../supabase/supabaseClient.js";

export default function Landing() {
  return (
    <Link to="/shows">
      <div className="landing">
        <h2>To shows</h2>

        <form>
        <p className="form-element">
          <label htmlFor="email"></label>
          <input className="form__input"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </p>
        <p className="form-element">
          <label htmlFor="email"></label>
          <input className="form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </p>
        <br />
        <div id="form-button">
          <button className="form__button" type="submit">Submit</button>
        </div>
      </form>
      </div>
    </Link>
    
  );
}
