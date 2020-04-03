import React from 'react';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import {Route,Switch} from 'react-router-dom';
import './pages/homepage/homepage.component';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
         <Route exact path='/' component={Homepage}></Route>
         <Route exact path='/shop' component={ShopPage}></Route>
      </Switch>
    </div>
  );
}

export default App; 
