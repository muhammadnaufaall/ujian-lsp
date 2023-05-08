import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Please Sign In to Make a Comment" });
    }

    // get user id
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    const { title, postId } = req.body.data;
    console.log(postId);

    if (!title.length) {
      return res.status(401).json({ message: "Please enter some text" });
    }

    //create post
    try {
      const result = await prisma.comment.create({
        data: {
          message: title,
          postId,
          userId: prismaUser?.id,
        } as any,
      });
      res.status(200).json({ message: "Comment Added 🥳", result });
    } catch (error) {
      res.status(403).json({ message: "Something went wrong" });
    }
  }
}
