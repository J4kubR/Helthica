import MainLogo from "./logo/Main_logo.png";

function NavigationBar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
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
            {/* ... Your other list items ... */}
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
