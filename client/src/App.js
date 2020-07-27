import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import axios from "axios";
import "./App.scss";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Routes from "./components/Routes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={Routes} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
