import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Post from "./Post";
import PostOpen from "./PostOpen";
import NewPost from "./NewPost";
import TopPosts from "./TopPosts";
import NotFound from "./NotFound";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/post/:id" component={PostOpen} />
        <Route exact path="/new-post" component={NewPost} />
        <Route exact path="/top-posts" component={TopPosts} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {};

export default Routes;
