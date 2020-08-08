import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.scss";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Routes from "./components/Routes";
import Footer from "./components/Footer";

import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth-action";

if (localStorage.token) {
  setAuthToken(localStorage.token);
  console.log("YES WE HAVE A TOKEN");
} else {
  console.log("NO TOKEN FOUND");
}

const App = () => {
  useEffect(() => {
    // store.dispatch(getPosts());
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/page-:pageNum" component={Home} />
            <Route component={Routes} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
