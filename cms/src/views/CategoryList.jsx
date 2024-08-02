import axios from 'axios';
import { useEffect, useState } from "react";
import Toastify from 'toastify-js';
import gearLoad from "../components/assets/react.svg";
import { Link } from 'react-router-dom';

function ShowCategories({ url }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleDelete(id) {
        try {
            await axios.delete(`${url}/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            Toastify({
                text: "Successfully deleted",
                duration: 2000,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();

            fetchCategories();
        } catch (error) {
            Toastify({
                text: error.response?.data?.error || 'Failed to delete category',
                duration: 2000,
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

    async function fetchCategories() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${url}/category`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            setCategories(data.categories);
        } catch (error) {
            Toastify({
                text: error.response?.data?.error || 'Failed to fetch categories',
                duration: 2000,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            {loading ? (
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} alt="Loading" />
                </div>
            ) : (
                <div className="overflow-x-auto mt-10">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Category Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <th>{category.id}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">{category.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default ShowCategories;
