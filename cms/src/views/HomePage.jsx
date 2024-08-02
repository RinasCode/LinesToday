import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, Link, useLocation } from "react-router-dom";
import gearLoad from "../components/assets/react.svg";

export default function HomePage({ url }) {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/article/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      Toastify({
        text: "Success delete",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      fetchArticles();
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Failed to delete article",
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

  async function fetchArticles() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/article`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setArticles(data.article);
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Failed to fetch articles",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategory() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCategory(data.categories);
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Failed to fetch categories",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchArticles(); // Refetch articles if refreshed
      // Clear the refresh state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state?.refresh, navigate]);

  return (
    <>
    <br />
      <div className="flex justify-between mt-10 mb-4 bg-transparent h-auto w-[9%]">
        <Link to="/add">
          <button className="btn btn-outline btn-success h-auto w-full">Add Articles</button>
        </Link>
      </div>

      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} alt="Loading..." />
        </div>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Content</th>
                <th>Title</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article.id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={article.imgUrl} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{article.name}</div>
                        <div className="text-sm opacity-50">
                          {category.find(
                            (cat) => cat.id === article.categoryId
                          )?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {article.content}
                  </td>
                  <td>
                    {article.title}
                  </td>
                  <th>
                    <div className="flex gap-2">
                      <Link
                        to={`/edit/${article.id}`}
                        className="btn btn-ghost btn-xs text-yellow-500"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/edit-image/${article.id}`}
                        className="btn btn-ghost btn-xs text-blue-500"
                      >
                        Edit Image
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="btn btn-ghost btn-xs text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
