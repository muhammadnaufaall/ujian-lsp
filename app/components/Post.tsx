"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import moment from "moment";
import ReactMarkdown from "react-markdown";

type PostProps = {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  createdAt?: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function Post({
  id,
  name,
  avatar,
  postTitle,
  createdAt,
  comments,
}: PostProps) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="bg-white my-8 p-8 rounded-lg border border-indigo-600">
      <div className="flex gap-3 items-center">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-gray-700">{name}</h3>
          <p className="text-xs text-gray-500">
            {moment(createdAt).calendar()}
          </p>
        </div>
      </div>
      <div className="my-8">
        <ReactMarkdown>{postTitle}</ReactMarkdown>
      </div>
      {comments && (
        <div className="flex gap-4 cursor-pointer items-center">
          <Link href={`post/${id}`}>
            <p className=" text-sm font-bold text-gray-700">
              {comments?.length >= 1
                ? `${comments?.length} Comments`
                : "No Comments Yet"}
            </p>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
