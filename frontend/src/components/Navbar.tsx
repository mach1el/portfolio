import { Link, useLocation } from "react-router-dom";
import { Home, FolderKanban } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content navbar-centered">
        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            to="/portfolio"
            className={`navbar-link ${location.pathname === "/portfolio" ? "active" : ""}`}
          >
            <FolderKanban size={18} />
            <span>Portfolio</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
