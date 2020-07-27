import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Post from "./Post";
import NewPost from "./NewPost";
import TopPosts from "./TopPosts";
import NotFound from "./NotFound";

const Routes = (props) => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/new-post" component={NewPost} />
        <Route exact path="/top-posts" component={TopPosts} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {};

export default Routes;
