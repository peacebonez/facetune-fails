import React, { useEffect } from "react";
import { getTopPosts } from "../actions/post-action";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Post from "./Post";
import Loading from "./Loading";
import NotFound from "./NotFound";

const TopPosts = ({ post: { posts, loading, error }, getTopPosts }) => {
  useEffect(() => {
    getTopPosts();
  }, [getTopPosts]);

  if (error.hasOwnProperty("msg")) {
    return <NotFound />;
  }

  return loading ? (
    <Loading type="spokes" />
  ) : (
    <section className="post-container">
      <ul>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ul>
    </section>
  );
};

TopPosts.propTypes = {
  post: PropTypes.object,
  getTopPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getTopPosts })(TopPosts);
