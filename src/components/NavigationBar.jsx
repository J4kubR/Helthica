import mainLogo from "./logo/Main_logo.png";
import "./NavigationBarFunctions.jsx";
import { Link } from "react-router-dom";

const collapseNavbarText = () => {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto md-2 mb-lg-0">
        <li className="nav-item">
          <Link
            className="nav-link active mx-4 text-body-secondary align-baseline"
            aria-current="page"
            to="/"
          >
            Pacjenci
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active mx-4 text-body-secondary align-baseline"
            aria-current="page"
            to="/Deklaracje"
          >
            Deklaracje
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active mx-4 text-body-secondary"
            aria-current="page"
            to="/Swiadczenia"
          >
            Świadczenia
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active mx-4 text-body-secondary"
            aria-current="page"
            to="/Terminarz"
          >
            Terminarz
          </Link>
        </li>

        <li className="nav-item dropdown mx-4">
          <a
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Opcje
          </a>

          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/Wszyscy Pacjenci">
                Wszyscy pacjenci
              </Link>
            </li>

            <li>
              <a
                className="dropdown-item"
                href="https://pharmindex.pl"
                target="_blank"
              >
                Pharmaindex
              </a>
            </li>

            <li>
              <Link className="dropdown-item" to="/Ustawienia">
                Ustawienia
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input
          className="form-control me-4 border border-success-subtle sizefix"
          type="search"
          placeholder="Szukaj pacjentów"
          aria-label="Search"
          id="SearchPatients"
        />
        <button className="btn btn-success mx-3 px-4" type="submit">
          Szukaj
        </button>
      </form>
    </div>
  );
};

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg rounded-5">
      <div className="container-fluid">
        <a
          className="navbar-brand px-2 fw-bold fst-italic text-success-emphasis"
          href="/"
        >
          <img
            src={mainLogo}
            alt="Logo"
            className="d-inline-block align-text-bottom logo"
          />
          Heltica
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {collapseNavbarText()}
      </div>
    </nav>
  );
};

export default NavigationBar;
