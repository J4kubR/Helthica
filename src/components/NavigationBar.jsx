import MainLogo from "./logo/Main_logo.png";

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={MainLogo} alt="Logo" width={40} height={40} />
          <h5>Heltica</h5>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Kalendarz
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>

        <div className="btn-group" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
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
            <button className="btn btn-outline-success" type="submit">
              Szukaj
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
