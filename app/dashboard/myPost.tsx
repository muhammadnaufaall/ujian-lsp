"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import EditPost from "./editPost";

type AuthPosts = {
  title: string;
  Comment: { id: string; postId: string; userId: string }[];
  email: string;
  id: string;
  image: string;
  name: string;
  Post: {
    createdAt: string;
    id: string;
    title: string;
    Comment?: {
      createdAt: string;
      id: string;
      postId: string;
      message: string;
      userId: string;
    }[];
  }[];
};

const fetchPosts = async () => {
  const res = await axios.get("/api/posts/myPost");
  return res.data;
};

export default function MyPost() {
  const { data, isLoading } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["myPosts"],
  });
  if (isLoading) return <Loading />;
  if (data) console.log(data);
  return (
    <div>
      {data?.result.Post?.map((post: AuthPosts) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.result.image}
          name={data.result.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  );
}
