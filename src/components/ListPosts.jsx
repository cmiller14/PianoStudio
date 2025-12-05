import React from "react";

function ListPosts({ posts, handlePostClick, isAdmin }) {
  return (
    <>
      {/* Section Header */}
      <h2 className="text-center fw-bold mb-4" style={{ letterSpacing: "0.5px" }}>
        Latest News
      </h2>

      <div className="d-flex flex-column align-items-center">

        {posts.length === 0 && (
          <p className="text-muted fs-5">No News Yet.</p>
        )}

        {posts.map((post) => (

          <div
            key={post.id}
            className={`news-card card mb-4 shadow-sm ${isAdmin ? "clickable-post" : ""}`}
            style={{
              maxWidth: "700px",
              width: "90%",
              borderRadius: "16px",
            }}
            onClick={() => isAdmin && handlePostClick(post)}
          >
            
            <div className="card-body p-4">

              <h3 className="card-title fw-semibold mb-2">{post.title}</h3>

              <p className="text-muted small mb-3">{post.date}</p>

              {post.image && (
                <div className="post-image-wrapper mb-3">
                <img
                  src={post.image}
                  alt="Post"
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "350px", objectFit: "cover" }}
                />
                </div>
              )}

              <p className="card-text">{post.body}</p>
            </div>
          </div>

        ))}

      </div>
    </>
  );
}

export default ListPosts;

