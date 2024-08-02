import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home"
import BaseLayout from "../views/BaseLayout";
import ArticleDetails from "../views/ArticleDetails";
const url = 'https://server.rinasismita.online'

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <Home url={url} />
            },
            {
                path: '/public/article/:id',
                element: <ArticleDetails url={url} />
            }
        ]
    }
])

export default router