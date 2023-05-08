"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string;
};

export default function LoggedIn({ image }: User) {
  return (
    <li className='flex gap-8 items-center'>
      <button
        className='bg-white border border-indigo-600 text-sm text-indigo-600 px-6 py-2 rounded-xl'
        onClick={() => signOut()}>
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          className='rounded-full'
          src={image}
          width={40}
          height={40}
          alt='Profile Pic'
          priority
        />
      </Link>
    </li>
  );
}
