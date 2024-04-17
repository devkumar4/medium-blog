import { Link } from "react-router-dom";
import logo from "../../public/pencil.png";
import { Avatar } from "./BlogCard";
export const Appbar = () => {
  const userName = JSON.stringify(localStorage.getItem("name")).substring(1);
  const Logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
  };

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/"} className="flex flex-col justify-center">
        <div className="text-xl font-semibold flex">
          Medium <img src={logo} alt="" className="w-8 h-8" />
        </div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 "
          >
            Publish
          </button>
        </Link>
        <Link to={"/"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 "
            onClick={Logout}
          >
            Logout
          </button>
        </Link>
        <Avatar name={String(userName)} size={"large"} />
      </div>
    </div>
  );
};
