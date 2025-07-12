import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  
  return (
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="/">BlogNest</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><a className="nav-link px-3" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link px-3" href="/blogs">Blogs</a></li>
            <li className="nav-item">
              <a className="btn btn-outline-light rounded-pill px-3 py-1 mx-2" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary rounded-pill px-3 py-1 mx-2" href="/signup">Sign Up</a>
            </li>
            <li className="nav-item">
              <a className="btn btn-danger rounded-pill px-3 py-1" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

