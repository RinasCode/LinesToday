import axios from 'axios';
import Toastify from 'toastify-js';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from 'react';

function EditImage({ url }) {
    const [articles, setArticles] = useState([]);
    const [image, setImage] = useState(null);
    const { id } = useParams();

    async function fetchArticles() {
        try {
            const { data } = await axios.get(`${url}/article/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            console.log(data, `data di edit image`);
            setArticles(data.article);
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
        fetchArticles();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("imgUrl", image);

            await axios.patch(`${url}/article/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            Toastify({
                text: "Image updated successfully!",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#8BC34A",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold",
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: "Failed to update image!",
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

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col mt-10">
                <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold">Edit Image</h3>
                    <p className="py-6">Update the article image.</p>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                        />
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <Link to="/" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditImage;
