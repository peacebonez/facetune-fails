import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPosts, getMorePosts } from "../actions/post-action";
import Post from "./Post";
import Loading from "./Loading";
import { set } from "mongoose";

const Home = ({ post: { posts, loading }, getPosts, getMorePosts }) => {
  let { pageNum } = useParams();
  let [page, setPage] = useState(parseInt(pageNum));

  console.log("CURRENT PAGE:", page);

  useEffect(() => {
    if (!pageNum) {
      console.log("PAGENUM UNDEFINED ON HOME PAGE:", pageNum);
      getPosts();
    } else {
      console.log("PAGE NUM USEEFFECT:", pageNum);
      setPage(parseInt(pageNum));
      getMorePosts(pageNum);
    }
  }, [getPosts, page]);

  const pageUp = () => {
    if (!pageNum) {
      setPage(1);
      pageNum = 1;
    } else setPage(parseInt(page) + 1);
    // setPage((page) => page + 1);

    console.log("PAGENUM:", pageNum);
  };
  const pageDown = () => {
    // setPage(() => page - 1);
    setPage(parseInt(page) - 1);
    console.log("PAGENUM:", pageNum);
    console.log("CURRENT PAGE:", page);
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
          justifyContent: `${!pageNum ? "flex-end" : "space-between"}`,
        }}
      >
        {page >= 1 && (
          <Link to={pageNum >= 1 ? `/page-${page}` : ""}>
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
  // console.log("POST STATE:", state.post);
  return { post: state.post };
};

export default connect(mapStateToProps, { getPosts, getMorePosts })(Home);
