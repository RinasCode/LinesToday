import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Card from "../components/Card";
import gearLoad from "../components/assets/Gear-0.2s-264px.svg";
import { Link } from "react-router-dom";
import Toastify from 'toastify-js';

function Home({ url }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('ShowAll');
    const [allArticles, setAllArticles] = useState([]);
    const [sort, setSort] = useState('title ASC');
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(9);

    const categories = [
        { key: 1, value: 'Technology' },
        { key: 2, value: 'Health' },
        { key: 3, value: 'Finance' },
        { key: 4, value: 'Travel' },
        { key: 5, value: 'Education' },
    ];

    async function fetchArticles() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}/public/article?search=${search}`);
            setAllArticles(data.data); // Simpan semua artikel untuk difilter dan diurutkan
            filterAndSortArticles(data.data);
        } catch (error) {
            Toastify({
                text: error.response?.data?.error || 'An error occurred',
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
    }, [url, search]);

    function searchOnChange(event) {
        setSearch(event.target.value);
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleSortChange(event) {
        setSort(event.target.value);
    }

    const filterAndSortArticles = useCallback(() => {
        let filteredArticles = allArticles;

        // Filter artikel berdasarkan query pencarian
        if (search) {
            filteredArticles = filteredArticles.filter(article => 
                article.title?.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter artikel berdasarkan kategori
        if (category !== 'ShowAll') {
            filteredArticles = filteredArticles.filter(article => 
                article.categoryId === parseInt(category)
            );
        }

        // Urutkan artikel berdasarkan opsi pengurutan
        const sortedArticles = filteredArticles.sort((a, b) => {
            if (!a.title || !b.title) return 0;

            if (sort === 'title ASC') {
                return b.title.localeCompare(a.title);
            } else if (sort === 'title DESC') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

        setArticles(sortedArticles);
    }, [search, category, sort, allArticles]);

    useEffect(() => {
        filterAndSortArticles();
    }, [search, category, sort, allArticles]);

    function paginate(articles) {
        const indexOfLastArticle = currentPage * articlesPerPage;
        const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
        return articles.slice(indexOfFirstArticle, indexOfLastArticle);
    }

    return (
        <>
            <div className="flex justify-between mb-4 mt-10">
                <div className="flex items-center gap-2">
                    <form className="flex justify-center items-center">
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="input input-bordered"
                            onChange={searchOnChange}
                            value={search}
                        />
                    </form>
                    <select className="select select-bordered" onChange={handleCategoryChange} value={category}>
                        <option value="ShowAll">Show All</option>
                        {categories.map(cat => (
                            <option key={cat.key} value={cat.key}>
                                {cat.value}
                            </option>
                        ))}
                    </select>
                    <select className="select select-bordered" onChange={handleSortChange} value={sort}>
                        <option value="title ASC">Title (A-Z)</option>
                        <option value="title DESC">Title (Z-A)</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} alt="Loading" />
                </div>
            ) : (
                <div id="PAGE-HOME" className="p-3">
                    <div className="grid grid-cols-3 gap-10 px-5 my-8 bg-white flex-wrap h-auto">
                        {paginate(articles).map(article => (
                            <Link key={article.id} to={`/public/article/${article.id}`}>
                                <Card article={article} />
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center mt-5">
                        <button 
                            className="btn btn-neutral" 
                            onClick={() => setCurrentPage(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button 
                            className="btn btn-grey" 
                            onClick={() => setCurrentPage(currentPage + 1)} 
                            disabled={paginate(articles).length < articlesPerPage}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
