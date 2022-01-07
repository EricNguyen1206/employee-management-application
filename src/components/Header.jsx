function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                Home
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm ml-3"
                        >
                            <a className="nav-link" href="/departments">
                                Departments
                            </a>
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm ml-3"
                        >
                            <a className="nav-link" href="/employees">
                                Employees
                            </a>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
