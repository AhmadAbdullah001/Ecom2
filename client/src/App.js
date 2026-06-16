// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Itemdetails from './pages/Itemdetails';
import FunctionContext from './context/FunctionContext';
import BuyPage from './pages/BuyPage';
import Orders from './pages/Orders';
import ContactUs from './pages/ContactUs';
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
        <Navbar showalert={showAlert} />
        <Routes>
          <Route path='/' element={<Home showalert={showAlert} />} />
          <Route path='/itemdetails' element={<Itemdetails showalert={showAlert} />} />
          <Route path='/buypage' element={<BuyPage showalert={showAlert} />} />
        </Routes>
        <div className='container'> {/* Wrap login and signup in a container div */}
          <Routes>
            <Route path='/cart' element={<Cart showalert={showAlert}/>} />
            <Route path='/contact' element={<ContactUs showalert={showAlert}/>} />
            <Route path='/orders' element={<Orders showalert={showAlert}/>} />
            <Route path='/login' element={<Login showalert={showAlert} />} />
            <Route path='/signup' element={<Signup showalert={showAlert} />} />
          </Routes>
        </div>
      </Router>
      </FunctionContext>
      </>
  );
}

export default App;
