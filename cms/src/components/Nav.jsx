import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 navbar bg-cyan-100 z-10">
        <div className="flex-1 px-2">
          <Link
            onClick={() => window.location.reload()}
            className="text-2xl font-bold px-6"
          >
            <span>Line Today</span>
          </Link>
        </div>
        <div className="flex flex-1 justify-center px-2">
          <div className="flex items-stretch">
            <h1 className="font-bold text-2xl  text-gray-500">Content Management System</h1>
          </div>
        </div>

        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch">
            {localStorage.access_token && (
              <>
                <div className="dropdown dropdown-end dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 text-black "
                  >
                    Menu
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/categories" className="flex items-stretch">
                        <span className="">Categories</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="flex items-stretch">
                        <span className="">Article</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/addUser" className="flex items-stretch">
                        <span className="">Add User</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleLogout}
                        className="flex items-stretch"
                      >
                        <span className="text-yellow-600">Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
