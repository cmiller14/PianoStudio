import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import ListPosts from "./ListPosts";
import AddPost from "./AddPost";
import { Api } from "../utils/api";
import { formatDate } from "../utils/format_date";

const API_URL = import.meta.env.VITE_API_URL;

function NewsBoard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [addPostButton, setAddPostButton] = useState(false);

  const token = useSelector((state) => state.application.authToken);
  const isAdmin = useSelector((state) => state.application.settings?.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.application.authToken);

  const api = useMemo(() => new Api(() => token), [token]);

  // Fetch News
  useEffect(() => {
    const loadNews = async () => {
      const response = await api.get(`${API_URL}/api/news`);

      // Format all dates in the fetched posts
      const formatted = response.map((post) => ({
        ...post,
        date: formatDate(post.date),
      }));

      setPosts(formatted);
    };

    loadNews();
  }, []);

  async function addPostDataBase(newsEvent) {
    const created = await api.post(`${API_URL}/api/news/add`, newsEvent);

    // Ensure backend response date is formatted too
    return { ...created, date: formatDate(created.date) };
  }

  async function uploadNewsImage(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.upload(`${API_URL}/api/news/upload-image`, formData);
    return response;  
}


  async function handleAddPost(e) {
    e.preventDefault();
    let imageUrl = null;
      // 1. Upload image if selected
    if (imageFile) {
      console.log(imageFile);
      const uploadRes = await uploadNewsImage(imageFile);
      imageUrl = uploadRes.url;
    }

    const newPost = {
      title,
      date,
      body,
      image: imageUrl,
    };

    addPostDataBase(newPost).then((formattedPost) => {
      // Add the new post with formatted date
      setPosts((prev) => [formattedPost, ...prev]);
    });

    // Clear form
    setTitle("");
    setDate("");
    setBody("");
    setImageFile(null);
    setAddPostButton(false);
  }

  return (
    <div className="container my-5">
      <ListPosts posts={posts} />

      {!addPostButton && isAdmin && isLoggedIn && (
        <button
          className="btn btn-primary"
          onClick={() => setAddPostButton(true)}
        >
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

