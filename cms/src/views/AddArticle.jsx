import React from "react";
import ArticleForm from "../components/ArticleForm";
import Toastify from 'toastify-js';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function AddArticle({ url }) {
  const navigate = useNavigate();

  const handleSubmit = async (e, title, content, imgUrl, categoryId) => {
    e.preventDefault();
    const article = { title, content, imgUrl, categoryId };
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(`${url}/article`, article, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Toastify({
        text: "Article added successfully",
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
      navigate("/");
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
  };

  return (
    <ArticleForm url={url} handleSubmit={handleSubmit} nameProp="Add Article" />
  );
}
