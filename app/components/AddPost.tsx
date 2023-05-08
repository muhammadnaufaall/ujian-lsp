"use client";

import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  const { mutate } = useMutation(
    async (title: String) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message, { id: toastPostID });
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["allPost"]);
        toast.success(data?.data?.message, { id: toastPostID });
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();
    toastPostID = toast.loading("Creating an Awesome Post...");
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="px-6 py-8 mb-8 bg-white rounded-md ">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          placeholder="What's on your mind?"
          className="p-4 my-2 text-base bg-gray-100 rounded-md"
        />
      </div>
      <div className="flex items-center justify-between gap-2 ">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}>{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="px-6 py-2 text-sm text-white bg-indigo-600 rounded-xl disabled:opacity-25"
          type="submit">
          Create post
        </button>
      </div>
    </form>
  );
}
