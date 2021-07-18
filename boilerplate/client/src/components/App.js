import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import Auth from "../hoc/auth";
// pages for this product
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import StorePage from './views/StorePage/StorePage';

// null  Anyone Can go inside
// true  only logged in user can go inside
// false logged in user can't go inside

function App() {
  const Container = styled.div`
    height: 100vh;
    // background
    padding: 6.5rem calc((100vw - 1193px) / 2 + 1rem);
    @media screen and (max-width: 1193px) {
      padding: 6.5rem 1rem;
    }
    @media screen and (max-width:767px) {
      padding: 6.5rem 2rem;
      flex-direction: column;
    }
  `;

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/store" component={Auth(StorePage, null)} />
        </Switch>
      </Container>
      <Footer />
    </Suspense>
  );
}

export default App;
