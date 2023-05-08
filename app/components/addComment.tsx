"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Comment = {
  postId?: string;
  title: string;
};
type PostProps = {
  id?: string;
};

export default function AddComment({ id }: PostProps) {
  let commentToastId: string;
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data: Comment) => {
      return axios.post("/api/posts/addComment", { data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["detailPost"]);
        setTitle("");
        setIsDisabled(false);
        toast.success("Your Comment Has Been Added", { id: commentToastId });
      },
      onError: (error) => {
        console.log(error);
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastId = toast.loading("Adding your comment", {
      id: commentToastId,
    });
    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3 className="text-xl">Add a comment</h3>

      <div className="flex flex-col my-2">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          className="p-4 text-base rounded-md my-2"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}>{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className=" text-sm bg-indigo-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit">
          Add Comment 🚀
        </button>
      </div>
    </form>
  );
}
