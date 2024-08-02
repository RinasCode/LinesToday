import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import ArticleForm from "../components/ArticleForm";

export default function EditArticle({ url }) {
  const [article, setArticle] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchArticle() {
      try {
        const { data } = await axios.get(`${url}/article/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setArticle(data.article);
      } catch (error) {
        Toastify({
          text: error.response?.data?.error || "Failed to fetch article",
          duration: 2000,
          gravity: "top",
          position: "left",
          background: "#EF4C54",
          color: "#17202A",
        }).showToast();
      }
    }
    fetchArticle();
  }, [id, url]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e, title, content, imgUrl, categoryId) => {
    try {
      e.preventDefault();

      console.log(title, content, imgUrl, categoryId);
      const articles = { title, content, imgUrl, categoryId };

      await axios.put(`${url}/article/${id}`, articles, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      Toastify({
        text: "Article updated successfully",
        duration: 2000,
        gravity: "top",
        position: "left",
        background: "#00B29F",
        color: "#17202A",
      }).showToast();

      navigate("/", { state: { refresh: true } });
    } catch (error) {
      console.log(error);

      Toastify({
        text: error.response?.data?.error || "Failed to update article",
        duration: 2000,
        gravity: "top",
        position: "left",
        background: "#EF4C54",
        color: "#17202A",
      }).showToast(); 
    }
  };

  return (
    <ArticleForm
      url={url}
      handleSubmit={handleSubmit}
      article={article}
      nameProp="Edit Article"
      onFileChange={handleFileChange}
    />
  );
}
