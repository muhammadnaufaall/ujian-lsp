import React from "react";
import Link from "next/link";
import Login from "./Login";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import LoggedIn from "./LoggedIn";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-lg text-indigo-600">BeYou.</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <LoggedIn image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}
