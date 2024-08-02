import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import axios from "axios";
import { Link } from "react-router-dom";

function ArticleForm({ url, handleSubmit, article, nameProp }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setImgUrl(article.imgUrl);
      setCategoryId(article.categoryId);
    }
  }, [article]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.categories);
    } catch (error) {
      Toastify({
        text: error.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col mt-10">
        <div className="text-center lg:text-left">
          <h3 className="text-2xl font-bold">{nameProp}</h3>
          <p className="py-6">Fill in the form to {nameProp}.</p>
        </div>
        <div className="card bg-base-100 shadow-2xl">
          <form
            onSubmit={(e) => {
              handleSubmit(e, title, content, imgUrl, categoryId);
            }}
            className="card-body grid grid-cols-2"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Article Title</span>
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Artcile Name"
                className="input input-bordered"
                value={title}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <input
                onChange={(e) => setContent(e.target.value)}
                type="text"
                placeholder="Article Content"
                className="input input-bordered"
                value={content}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                onChange={(e) => setImgUrl(e.target.value)}
                type="url"
                placeholder="Image URL"
                className="input input-bordered"
                value={imgUrl}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered"
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
                required
              >
                <option value="" disabled hidden>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mt-6 grid grid-cols-2">
              <button type="submit" className="btn btn-primary">
                {nameProp}
              </button>
              <Link to="/">
                <button className="btn btn-neutral hover:btn-accent-focus transition duration-300 ease-in-out">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArticleForm;
