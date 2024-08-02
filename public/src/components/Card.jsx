import { useNavigate } from "react-router-dom";

export default function Card({ article }) {
  console.log('Article:', JSON.stringify(article, null, 2)); // Menambahkan log untuk memeriksa objek article
  return (
    <>
      <div className="card bg-base-100 w-50 shadow-xl flex-wrap hover:scale-110">
        <div className="mask mask-squircle w-38">
          <img src={article.imgUrl} alt="articleArticle image" />
        </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{article.title}</h2>
          <p>{article.category}</p>
        </div>
      </div>
    </>
  );
}
