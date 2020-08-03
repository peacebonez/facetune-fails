import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPosts, getMorePosts } from "../actions/post-action";
import Post from "./Post";
import Loading from "./Loading";

const Home = ({ post: { posts, loading }, getPosts, getMorePosts }) => {
  let [page, setPage] = useState(1);
  let { pageNum } = useParams();

  useEffect(() => {
    getPosts();
    console.log("PAGE NUM USEEFFECT:", pageNum);
    getMorePosts(pageNum);
  }, [getPosts, getMorePosts, pageNum]);

  const pageUp = () => {
    // setPage((page) => page + 1);
    setPage(page + 1);
    console.log("PAGENUM:", pageNum);
    console.log("CURRENT PAGE:", page);
    // getMorePosts(pageNum);
  };
  const pageDown = () => {
    // setPage(() => page - 1);
    setPage(page - 1);
    console.log("PAGENUM:", pageNum);
    console.log("CURRENT PAGE:", page);

    // getMorePosts(pageNum);
  };

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
          justifyContent: `${page === 1 ? "flex-end" : "space-between"}`,
        }}
      >
        {page > 1 && (
          <Link to={page > 1 ? `/page-${page}` : ""}>
            <button
              id="previous-btn"
              className="btn page-btn"
              onClick={pageDown}
            >
              Previous Page
            </button>
          </Link>
        )}
        <Link to={`/page-${page}`}>
          <button id="next-btn" className="btn page-btn" onClick={pageUp}>
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
