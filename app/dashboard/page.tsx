import React from "react";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import MyPost from "./myPost";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("api/auth/signin");
  }

  return (
    <main>
      <h1>
        Welcome Back <b>{session.user?.name}</b> this is all of your post!
      </h1>
      <MyPost />
    </main>
  );
}
