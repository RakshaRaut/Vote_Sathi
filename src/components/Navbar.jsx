function Navbar({ isScrolled }) {
  return (
    <nav className={isScrolled ? "nav-scrolled" : ""}>
      <a className="nav-logo" href="#">
        <div className="logo-badge">🗳️</div>
        Vote<span>Sathi</span>
      </a>

      <ul className="nav-links">
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#compare">Compare</a>
        </li>
        <li>
          <a href="#factcheck">Fact Check</a>
        </li>
        <li>
          <a href="#how">How It Works</a>
        </li>
        <li>
          <a href="#" className="nav-cta">
            Join Now
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;