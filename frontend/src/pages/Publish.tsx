import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";

import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            onClick={async () => {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${res.data.id}`);
            }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between  outline-none">
        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600"></div>
        <div className="py-2 bg-white rounded-b-lg  w-full">
          <label className="sr-only">Publish post</label>
          <textarea
            id="editor"
            rows={9}
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 focus:outline-none"
            placeholder="Write an article..."
            required
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
