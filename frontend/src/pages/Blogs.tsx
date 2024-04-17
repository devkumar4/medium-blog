// import { Blogcard } from "../components/Blogcard";

import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import nothingtoShow from "../../public/anomate.gif";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center ">
        {blogs.length > 1 ? (
          <div className="mt-40">
            <h1 className="text-xl font-bold ">Nothing to show...</h1>
            <img src={nothingtoShow} />
          </div>
        ) : (
          <div>
            {blogs.map((blog) => (
              <Blogcard
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                // publishedDate={blog.date}
                date={`${new Date().toLocaleDateString("en-us")} ${new Date(
                  blog.date
                ).toLocaleTimeString("en-us")}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
