import mainLogo from "./logo/Main_logo.png";
import "./NavigationBarFunctions.jsx";

function collapseNavbarText() {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto md-2 mb-lg-0">
        <li className="nav-item">
          <a
            className="nav-link active mx-4 text-body-secondary align-baseline"
            aria-current="page"
            href="#"
          >
            Deklaracje
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active mx-4 text-body-secondary"
            aria-current="page"
            href="#"
          >
            Świadczenia
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link active mx-4 text-body-secondary"
            aria-current="page"
            href="#"
          >
            Terminarz
          </a>
        </li>

        <li className="nav-item dropdown mx-4">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Opcje
          </a>

          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Wszyscy pacjenci
              </a>
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
              <a className="dropdown-item" href="#">
                Ustawienia
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Szukaj pacjentów"
          aria-label="Search"
        />
        <button className="btn btn-outline-success mx-3" type="submit">
          Szukaj
        </button>
      </form>
    </div>
  );
}

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg rounded-5">
      <div className="container-fluid">
        <a
          className="navbar-brand px-2 fw-bold fst-italic text-success-emphasis"
          href="#"
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
}

export default NavigationBar;
