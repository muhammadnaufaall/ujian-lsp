"use client";

import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Post from "./components/Post";
import Loading from "./components/Loading";

type PostsType = {
  title: string;
  id: string;
  createdAt?: string;
  Comment?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
  user: {
    name: string;
    image: string;
  };
};

const allPost = async () => {
  const res = await axios.get("/api/posts/getPost");
  return res.data;
};

export default function Home() {
  const [count, setCount] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryFn: allPost,
    queryKey: ["allPost"],
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <main>
      <AddPost />
      {data?.result.slice(0, count).map((post: PostsType, index: number) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user?.name}
          avatar={post?.user?.image}
          postTitle={post.title}
          createdAt={post.createdAt}
          comments={post.Comment || []}
        />
      ))}
      <div className="flex justify-center p-10">
        <button
          disabled={data.result.length <= count}
          className="px-6 py-2 text-sm text-white bg-indigo-600 rounded-xl disabled:opacity-25"
          onClick={() => setCount(count + 10)}>
          {data.result.length > count ? "Load Older Posts" : "No Other Posts"}
        </button>
      </div>
    </main>
  );
}
