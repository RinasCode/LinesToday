import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import Toastify from 'toastify-js'

function ArticleDetails({ url }) {
    const [articles, setArticles] = useState([]);
    const { id } = useParams()

    // console.log(article.Category);
    async function fetchArticles() {
        try {
            const { data } = await axios.get(`${url}/public/article/${id}`)
            // console.log(data.find,"????????")
            setArticles(data.find)
        } catch (error) {
            Toastify({
                text: error.response.data.error,
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
                    fontWeight: "bold"
                }
            }).showToast();
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        <>
            <div className="hero bg-base-200 min-h-screen mt-10">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={articles.imgUrl}
                        alt="gambar article"
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{articles.title}</h1>
                        <p className="py-6 text-xl">
                            {articles.content}
                        </p>
                        <Link to="/">
                            <button className="btn btn-neutral btn-primary">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ArticleDetails