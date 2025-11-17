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
  }

  return (
    <div className="container my-5">

      <ListPosts posts={posts} />

      {isAdmin && isLoggedIn && (
        <AddPost 
          handleAddPost={handleAddPost}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          body={body}
          setBody={setBody}
          setImageFile={setImageFile}/>
        )
      }

    </div>
  );
}

export default NewsBoard;
