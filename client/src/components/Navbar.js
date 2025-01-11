import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import itemContext from './Context';
import '../components/style.css'
function Navbar(props) {
  const context = useContext(itemContext);
  const { fetchproducts } = context;
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const nav = useNavigate();
  const loc = useLocation();

  // Fetch products from context
  const getProducts = async () => {
    let item = await fetchproducts();
    setItems(item);
    setFilteredItems(item); // Initially, show all items
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    const temp = items.filter(item =>
      item.head.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(temp);
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem('token');
    props.showalert('Logout Successful', 'success');
    nav('/');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ overflowY: "hidden" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Ecoms</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${loc.pathname === '/' ? "active" : ""}`} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${loc.pathname === '/contact' ? "active" : ""}`} aria-current="page" href="/contact">Contact Us</a>
              </li>
              {/* Conditionally render the search input */}
              {loc.pathname === "/" && (
                <li>
                  <input
                    placeholder="Search"
                    onChange={handleSearch}
                    value={query}
                    type="text"
                    style={{
                      position: "relative",
                      left: "30vw",
                      top: "8px",
                      width: "15vw",
                      borderRadius: "20px",
                      border: "black solid 1px",
                      outline: "none",
                      paddingLeft: "4px"
                    }}
                  />
                </li>
              )}
            </ul>
            {!localStorage.getItem('token') ? (
              <form>
                <Link className="btn btn-success mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-success mx-2" to="/signup" role="button">Signup</Link>
              </form>
            ) : (
              <form className="d-flex" role="search">
                <button className="btn btn-success mx-2" onClick={() => nav('/orders')}>Orders</button>
                <button className="btn btn-success mx-2" onClick={() => nav('/orders')}>Cart</button>
                <button className="btn btn-danger mx-2" onClick={logout}>Logout</button>
              </form>
            )}
          </div>
        </div>
      </nav>

      {/* Display filtered items */}
      {loc.pathname === "/" && query !== "" && (
        <div className="container mt-4" id="SearchResult" style={{ position: "absolute", zIndex: 1, width: "max-content", left: "39vw", height: "19.2vh", overflow: "auto"  }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <center key={index}>
                <div className="card mb-2" onClick={() => nav('/itemdetails', { state: item })} style={{ width: "20vw", cursor: "pointer" }}>
                  <div className="card-body d-flex">
                    <img src={item.imgurl[0]} alt={item.head} height="50px" width="50px" style={{ objectFit: "contain", marginRight: "30px" }} />
                    <h5 className="card-title" style={{ marginTop: "10px" }}>{item.head}</h5>
                  </div>
                </div>
              </center>
            ))
          ) : (
            <p style={{color:"white"}}>No results found</p>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
