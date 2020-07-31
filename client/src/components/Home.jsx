import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Post from "./Post";

let posts = [];

const Home = ({ posts }) => {
  return (
    <section className="post-container">
      <Post />
      {/* <ul>{posts && posts.map((post) => <Post />)}</ul> */}
      <button className="btn next-btn">Next Page</button>
    </section>
  );
};

Home.propTypes = {};

//Bring in the posts from MongoDB
export default Home;
