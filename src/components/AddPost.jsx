import React from "react";

function AddPost({handleAddPost, title, setTitle, date, setDate, body, setBody, setImageFile}) {
    return (
        <>
            {/* Add Post Form */}
            <h2>Add News Post</h2>
            <form onSubmit={handleAddPost} className="mb-5">
                <div className="mb-3">
                <label className="form-label">Title:</label>
                <input
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Date:</label>
                <input
                    className="form-control"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Body:</label>
                <textarea
                    className="form-control"
                    rows="4"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                ></textarea>
                </div>

                <div className="mb-3">
                <label className="form-label">Photo (optional):</label>
                <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                </div>

                <button className="btn btn-primary" type="submit">
                Add Post
                </button>
            </form>
        </>
    );
}

export default AddPost;