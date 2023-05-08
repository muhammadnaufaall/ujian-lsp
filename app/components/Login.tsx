"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li className='list-none'>
      <button
        onClick={() => signIn()}
        className='text-sm text-white bg-indigo-600 py-2 px-6 rounded-xl '>
        Sign In
      </button>
    </li>
  );
}
