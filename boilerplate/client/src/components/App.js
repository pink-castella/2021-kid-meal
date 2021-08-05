import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import StorePage from './views/StorePage/StorePage';
import ProductPage from './views/ProductPage/ProductPage';
import AddressPage from './views/AddressPage/AddressPage';
import FavoritePage from './views/FavoritePage/FavoritePage';
import CartPage from './views/CartPage/CartPage';
import MyPage from './views/MyPage/MyPage';

// null  Anyone Can go inside
// true  only logged in user can go inside
// false logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/store" component={Auth(StorePage, null)} />
          <Route exact path="/store/:storeId" component={Auth(ProductPage, null)} />
          <Route exact path="/address" component={Auth(AddressPage, true)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
          <Route exact path="/cart" component={Auth(CartPage, true)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} /> 
        </Switch>
      <Footer />
    </Suspense>
  );
}

export default App;
