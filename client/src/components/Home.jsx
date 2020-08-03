import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, getMorePosts } from "../actions/post-action";
import Post from "./Post";
import Loading from "./Loading";

const Home = ({ post: { posts, loading }, getPosts, getMorePosts }) => {
  let [page, setPage] = useState(0);
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const pageUp = () => {
    setPage(page + 1);
    console.log(page);

    // getMorePosts() get the pagenum from url
  };
  const pageDown = () => {
    setPage(page - 1);
    console.log(page);

    // getMorePosts()    get the pagenum from url
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
          justifyContent: `${page === 0 ? "flex-end" : "space-between"}`,
        }}
      >
        {page > 0 && (
          <button id="previous-btn" className="btn page-btn" onClick={pageDown}>
            Previous Page
          </button>
        )}
        <button id="next-btn" className="btn page-btn" onClick={pageUp}>
          Next Page
        </button>
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
