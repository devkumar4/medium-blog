import { SignupInput } from "@dev9012/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "sonner";
import { Spinner } from "./Spinner";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  console.log(postInputs);

  async function sendRequest() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      console.log(jwt, "Devvvv");

      localStorage.setItem("token", jwt.jwt);
      localStorage.setItem("name", jwt.user);
      {
        type === "signup"
          ? toast.success("Go ahead and sign !")
          : toast.success("Account Created 🎊");
      }

      {
        type === "signup" ? navigate("/signin") : navigate("/blogs");
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "Oops! The email or password you entered is incorrect. Please try again."
      );
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400 text-center">
              {type === "signin"
                ? "Don't have an account? "
                : " Already have an account? "}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline"
              >
                {type === "signin" ? "Signup" : "Signin"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelInput
                label="Name"
                placeholder="Dev Kumar"
                onChange={(e) => {
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            ) : null}

            <LabelInput
              label="Username"
              placeholder="dev@gmail.com"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  username: e.target.value,
                }));
              }}
            />
            <LabelInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
            >
              {loading ? (
                <div className="flex justify-center">
                  <Spinner size={4} />
                </div>
              ) : type === "signin" ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface LabelInpuType {
  label: string;
  placeholder: string;
  type?: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function LabelInput({ label, placeholder, onChange, type }: LabelInpuType) {
  return (
    <div>
      <div>
        <label
          //   for="first_name"
          className="block mb-2 text-sm font-semibold text-black pt-5"
        >
          {label}
        </label>
        <input
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}
