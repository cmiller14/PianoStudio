import { useState } from "react";
import { useSelector } from 'react-redux';
import ListPosts from "./ListPosts";
import AddPost from "./AddPost";

function NewsBoard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [addPostButton, setAddPostButton] = useState(false);

  const isAdmin = useSelector(state => state.application.settings?.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.application.authToken);

  function handleAddPost(e) {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      date,
      body,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
    };

    setPosts([newPost, ...posts]);

    // Clear form
    setTitle("");
    setDate("");
    setBody("");
    setImageFile(null);

    // Close modal
    setAddPostButton(false);
  }

  return (
    <div className="container my-5">

      <ListPosts posts={posts} />

      {!addPostButton && isAdmin && isLoggedIn && (
        <button className="btn btn-primary" onClick={() => setAddPostButton(true)}>
          Add Post
        </button>
      )}

      {addPostButton && (
        <div className="modal-overlay" onClick={() => setAddPostButton(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button 
              className="close-button" 
              onClick={() => setAddPostButton(false)}
            >
              ✕
            </button>

            <AddPost
              handleAddPost={handleAddPost}
              title={title}
              setTitle={setTitle}
              date={date}
              setDate={setDate}
              body={body}
              setBody={setBody}
              setImageFile={setImageFile}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default NewsBoard;

