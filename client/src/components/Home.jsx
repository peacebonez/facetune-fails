import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPosts, getMorePosts } from "../actions/post-action";
import Post from "./Post";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Home = ({ post: { posts, loading, error }, getPosts, getMorePosts }) => {
  const [onLastPage, setOnLastPage] = useState(false);
  const oldest_id = "5f25c79c4a88d1b5628c2ce5";
  let postIDs;

  //grabbing page number from URL
  let { pageNum } = useParams();
  if (!pageNum) pageNum = 0;
  pageNum = parseInt(pageNum);

  useEffect(() => {
    if (!pageNum) getPosts();
    else getMorePosts(pageNum);
  }, [pageNum]);

  useEffect(() => {
    postIDs = posts.map((post) => post._id);
    setOnLastPage(postIDs.includes(oldest_id));
  }, [pageNum, posts]);

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
              onClick={() => window.scrollTo(0, 0)} // jumps to top of page
            >
              Previous Page
            </button>
          </Link>
        )}
        {!onLastPage && (
          <Link to={`/page-${pageNum + 1}`}>
            <button
              id="next-btn"
              className="btn page-btn"
              onClick={() => window.scrollTo(0, 0)} // jumps to top of page
            >
              Next Page
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  // console.log("POST STATE:", state.post);
  return { post: state.post };
};

export default connect(mapStateToProps, { getPosts, getMorePosts })(Home);
