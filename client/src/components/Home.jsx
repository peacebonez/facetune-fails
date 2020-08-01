import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post-action";
import Post from "./Post";
import Loading from "./Loading";

const Home = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Loading type="spokes" />
  ) : (
    <section className="post-container">
      <ul>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ul>
      <button className="btn next-btn">Next Page</button>
    </section>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  console.log("POST STATE:", state.post);
  return { post: state.post };
};

export default connect(mapStateToProps, { getPosts })(Home);
