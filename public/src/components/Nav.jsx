import { Link } from "react-router-dom";


export default function Nav() {

    

    return (<>
        <nav className="navbar sticky top-0 z-10 p-3 bg-gray-100 shadow">
            <div className="navbar-start">
                <Link to="/" className="text-2xl font-bold px-6">
                    <span className="text-accent">Line Todays</span>
                </Link>
            </div>
            <div className="navbar-end">
            </div>
        </nav>
    </>)
}