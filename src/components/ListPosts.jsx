import React from "react";

function ListPosts({ posts }) {
  return (
    <>
      {/* Posts List */}
      <h2>News</h2>
      <div className="mt-4">

        {posts.length === 0 && (
          <p className="text-muted">No News.</p>
        )}

        {posts.map((post) => (
          <div
            key={post.id}
            className="card mb-4 shadow-sm"
          >
            <div className="card-body">

              <h3 className="card-title">{post.title}</h3>
              <p className="text-muted">{post.date}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="img-fluid rounded mb-3"
                />
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
