// App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Itemdetails from './pages/Itemdetails';
import FunctionContext from './context/FunctionContext';
import BuyPage from './pages/BuyPage';
import Orders from './pages/Orders';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import GraphicsCards from './pages/GraphicsCards';
import Processors from './pages/Processors';
import Motherboards from './pages/Motherboards';
import RAM from './pages/RAM';
import SSDs from './pages/SSDs';
import Monitors from './pages/Monitors';
import Keyboards from './pages/Keyboards';
import Mice from './pages/Mice';
import Headsets from './pages/Headsets';
import AdminPanel from './pages/AdminPanel';
import Laptops from './pages/Laptops';
import Documentation from './pages/Documentation';
import Shipping from './pages/Shipping';
import ReturnPolicy from './pages/ReturnPolicy';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Compliance from './pages/Compliance';

function AppContent({ showAlert }) {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup', '/admin'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {shouldShowNavbar && <Navbar showalert={showAlert} />}
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home showalert={showAlert} />} />
          <Route path='/graphics' element={<GraphicsCards showalert={showAlert} />} />
          <Route path='/processors' element={<Processors showalert={showAlert} />} />
          <Route path='/motherboards' element={<Motherboards showalert={showAlert} />} />
          <Route path='/ram' element={<RAM showalert={showAlert} />} />
          <Route path='/ssds' element={<SSDs showalert={showAlert} />} />
          <Route path='/monitors' element={<Monitors showalert={showAlert} />} />
          <Route path='/keyboards' element={<Keyboards showalert={showAlert} />} />
          <Route path='/mice' element={<Mice showalert={showAlert} />} />
          <Route path='/headsets' element={<Headsets showalert={showAlert} />} />
          <Route path='/itemdetails' element={<Itemdetails showalert={showAlert} />} />
          <Route path='/buypage' element={<BuyPage showalert={showAlert} />} />
          <Route path='/cart' element={<Cart showalert={showAlert}/>} />
          <Route path='/contact' element={<ContactUs showalert={showAlert}/>} />
          <Route path='/orders' element={<Orders showalert={showAlert}/>} />
          <Route path='/profile' element={<Profile showalert={showAlert}/>} />
          <Route path='/laptops' element={<Laptops showalert={showAlert}/>} />
          <Route path='/documentation' element={<Documentation showalert={showAlert}/>} />
          <Route path='/shipping' element={<Shipping showalert={showAlert}/>} />
          <Route path='/return-policy' element={<ReturnPolicy showalert={showAlert}/>} />
          <Route path='/privacy' element={<Privacy showalert={showAlert}/>} />
          <Route path='/terms' element={<Terms showalert={showAlert}/>} />
          <Route path='/compliance' element={<Compliance showalert={showAlert}/>} />
          <Route path='/login' element={<Login showalert={showAlert} />} />
          <Route path='/signup' element={<Signup showalert={showAlert} />} />
          <Route path='/admin' element={<AdminPanel showalert={showAlert} />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <FunctionContext showalert={showAlert}>
        <Alert alert={alert} />
        <Router>
          <AppContent showAlert={showAlert} />
        </Router>
      </FunctionContext>
    </>
  );
}

export default App;
