import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Personas App
        </Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Inicio
          </Link>

          <Link className="btn btn-outline-light" to="/personas">
            Personas
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;