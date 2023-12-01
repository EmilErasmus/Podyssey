/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import '../styles/SideBar.css';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/shows" onClick={onClose}>Dashboard</Link>
          </li>
          <li>
            <Link to="/favourites" onClick={onClose}>Favourites</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
}
