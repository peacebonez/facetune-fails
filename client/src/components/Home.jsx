import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPosts, getMorePosts } from "../actions/post-action";
import Post from "./Post";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Home = ({ post: { posts, loading, error }, getPosts, getMorePosts }) => {
  let { pageNum } = useParams();
  if (!pageNum) {
    pageNum = 0;
  }
  pageNum = parseInt(pageNum);
  console.log("Global PAGENum:", pageNum);

  useEffect(() => {
    if (!pageNum) {
      getPosts();
    } else {
      getMorePosts(pageNum);
    }
  }, [pageNum]);

  if (error.hasOwnProperty("msg")) {
    return <NotFound />;
  }

  return loading ? (
    <Loading type="spokes" />
  ) : (
    <section className="post-container">
      <ul>
        {posts.map((post) => <Post key={post._id} post={post} />).reverse()}
      </ul>
      <div
        className="pagination-container"
        style={{
          justifyContent: `${!pageNum ? "flex-end" : "space-between"}`,
        }}
      >
        {pageNum >= 1 && (
          <Link to={pageNum === 1 ? "" : `/page-${pageNum - 1}`}>
            <button
              id="previous-btn"
              className="btn page-btn"
              onClick={() => window.scrollTo(0, 0)}
            >
              Previous Page
            </button>
          </Link>
        )}
        <Link to={`/page-${pageNum + 1}`}>
          <button
            id="next-btn"
            className="btn page-btn"
            onClick={() => window.scrollTo(0, 0)}
          >
            Next Page
          </button>
        </Link>
      </div>
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

export default connect(mapStateToProps, { getPosts, getMorePosts })(Home);
