import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className=" h-screen  items-center justify-center grid grid-cols-2">
      <div className="bg-white  h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <h1 className="text-4xl text-gray-800 mb-6 font-extrabold text-center">
              <Typewriter
                words={["Medium", "Tell Us", "About Your", "Story !"]}
                loop={5}
                cursor
                cursorStyle="|"
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Turn your thoughts into reality with our rich text editor and
              seamless authentication process.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-slate-200 h-screen flex justify-center flex-col ">
        {localStorage.getItem("token") ? (
          <div className="flex justify-center">
            {" "}
            <div>
              <button
                className=" hover:text-black  rounded-full text-xxl font-semibold text-black px-5 py-2  ease-in-out bg-gray-500 hover:bg-gray-600 transition-all"
                onClick={() => navigate("/blogs")}
              >
                My Feed
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center px-10">
            <div>
              <button
                className=" hover:text-gray-500 hover:underline text-2xl font-bold text-black px-6 py-3 rounded-md transition duration-300 ease-in-out"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
              <button
                className=" hover:text-gray-500 hover:underline text-2xl font-bold text-black px-6 py-3 rounded-md transition duration-300 ease-in-out"
                onClick={() => navigate("/signin")}
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
