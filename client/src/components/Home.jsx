import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPosts, getMorePosts } from "../actions/post-action";
import Post from "./Post";
import Loading from "./Loading";

const Home = ({ post: { posts, loading }, getPosts, getMorePosts }) => {
  // let [page, setPage] = useState(
  //   typeof pageNum === "number" ? parseInt(pageNum) : 0
  // );

  // console.log("CURRENT PAGE:", page);
  let { pageNum } = useParams();
  pageNum = parseInt(pageNum);
  console.log("Global PAGENum:", pageNum);

  useEffect(() => {
    if (!pageNum) {
      // pageNum = 0;
      console.log("PAGENUM ON HOME PAGE:", pageNum);
      getPosts();
    } else {
      getMorePosts(pageNum);
    }
  }, [pageNum]);

  // const pageUp = () => {
  //   if (!pageNum) {
  //     // setPage(1);
  //     pageNum = 1;
  //   } else {
  //     pageNum += 1;
  //   }
  // else setPage(parseInt(page) + 1);
  // setPage((page) => page + 1);
  //   console.log("PAGENUM:", pageNum);
  // };

  // const pageDown = () => {
  //   // setPage(() => page - 1);
  //   // setPage(parseInt(page) - 1);

  //   parseInt((pageNum -= 1));
  //   console.log("PAGENUM:", pageNum);
  //   // console.log("CURRENT PAGE:", page);
  // };

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
              // onClick={pageDown}
            >
              Previous Page
            </button>
          </Link>
        )}
        <Link to={`/page-${pageNum + 1}`}>
          <button
            id="next-btn"
            className="btn page-btn"
            // onClick={pageUp}
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
  // console.log("POST STATE:", state.post);
  return { post: state.post };
};

export default connect(mapStateToProps, { getPosts, getMorePosts })(Home);
