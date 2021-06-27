import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import App from './App';


import Blog from './components/Blog';
import Detail from './components/Blog/Detail';
import Login from './components/Accounts/Login';
import Home from './Home';
import Account from './components/Accounts/index'
import Product from './components/Product/index';
import Product_detail from './components/Product/Product_details'
import Cart from './components/Cart/Cart'
import Wishlist from './components/Wishlist/Wishlist';

import reportWebVitals from './reportWebVitals';
import Hook from './components/Hook';

ReactDOM.render(
  <React.StrictMode>
     <Router>
        <App>
          <Switch>
            {/* test react hook */}
            <Route exact path='/hook' component={Hook}/>
            {/* Home */}
            <Route exact path='/' component={Home}/>
            {/* Wishlist */}
            <Route path='/wishlist' component={Wishlist} />
            {/* Cart */}
            <Route path='/cart' component={Cart}/>
            {/* Product */}
            <Route path='/product/list' component={Product}/>
            <Route path='/product/details/:id' component={Product_detail}/>
            {/* blog */}
            <Route path='/blog/list' component={Blog} />
            <Route path='/blog/detail/:id' component={Detail} />
            {/* login */}
            <Route path='/login' component={Login}/>
            <Route component={Account}/>
          </Switch>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
