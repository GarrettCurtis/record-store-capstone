import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import NavBar from './components/Navbar'
import Records from './components/Records'
import Registration from './components/Registration'
import Account from './components/Account'
import SingleRecord from './components/SingleRecord';
import Checkout from './components/Checkout';
import About from './components/About';
import ShoppingCart from './components/ShoppingCart';

import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <Routes>
          <Route path='/home' element={ <Records /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/records/:id' element={ <SingleRecord /> } />
          <Route path='/register' element={ <Registration /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/account' element={ <Account /> } />
          <Route path='/cart' element={ <ShoppingCart />} />
          <Route path='/checkout' element={ <Checkout /> } />
        </Routes>
      </div>
    </>
  );
}

export default App;
