import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";

let posts = [];

const Home = ({ posts }) => {
  return (
    <section className="post-container">
      <Post />
      <Post />
      <Post />
      <Post />
      {/* <ul>{posts && posts.map((post) => <Post />)}</ul> */}
    </section>
  );
};

Home.propTypes = {};

//Bring in the posts from MongoDB
export default Home;
