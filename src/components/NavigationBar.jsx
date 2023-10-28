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
            Cos tam
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active mx-4 text-body-secondary"
            aria-current="page"
            href="#"
          >
            Cos tam
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link active mx-4 text-body-secondary"
            aria-current="page"
            href="#"
          >
            Kalendarz
          </a>
        </li>

        <li className="nav-item dropdown">
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
              <a className="dropdown-item" href="#"></a>
            </li>

            <li>
              <a className="dropdown-item" href="#">
                Strona internetowa do wspomagania
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
    <nav
      style={{ backgroundColor: "#444444" }}
      className="navbar navbar-expand-lg rounded-5"
    >
      <div className="container-fluid">
        <a
          className="navbar-brand px-2 fw-bold fst-italic text-success-emphasis"
          href="#"
        >
          <img
            src={mainLogo}
            alt="Logo"
            width={30}
            height={28}
            className="d-inline-block align-text-bottom"
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
