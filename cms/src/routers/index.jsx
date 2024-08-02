import { createBrowserRouter, redirect } from "react-router-dom";
import Home from '../views/HomePage';
import AddArticle from '../views/AddArticle';
import AddUser from '../views/AddUser';
import EditArticle from '../views/EditArticle';
import EditImage from '../views/EditImage';
import BaseLayout from '../views/BaseLayout';
import Login from '../views/LoginPage';
import ListCategory from '../views/CategoryList';
import Toastify from 'toastify-js';

const url = 'https://server.rinasismita.online';

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login url={url} />,
        loader: () => {
            if (localStorage.access_token) {
                Toastify({
                    text: "You already logged in",
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
                return redirect('/')
            }
            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please log in first",
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
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/login')
            }
            return null
        },
        children: [
            {
                path: '/',
                element: <Home url={url} />
            },
            {
                path: '/add',
                element: <AddArticle url={url} />
            },
            {
                path: "/edit/:id",
                element: <EditArticle url={url} />
            },
            {
                path: "/categories",
                element: <ListCategory url={url} />
            },
            {
                path: "/edit-image/:id",
                element: <EditImage url={url} />
            },
            {
                path: "/addUser",
                element: <AddUser url={url} />
            },
        ]
    }
]);

export default router;

