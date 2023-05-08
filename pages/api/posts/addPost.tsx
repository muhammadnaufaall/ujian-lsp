import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get title
  const title: string = req.body.title;

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Please Sign In to Make a Post" });
    } else if (title.length < 1) {
      res.status(403).json({ message: "please do not leave it empty ☹️" });
    }

    // get user id
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    //title check
    if (title.length < 1) {
      res.status(403).json({ message: "please do not leave it empty ☹️" });
    } else if (title.length > 300) {
      res.status(403).json({ message: "Oops, need to be shorter ☹️" });
    } else {
      //create post
      try {
        const result = await prisma.post.create({
          data: {
            title,
            userId: prismaUser?.id,
          } as any,
        });
        res.status(200).json({ message: "Post Created 🥳", result });
      } catch (error) {
        res.status(403).json({ message: "Something went wrong" });
      }
    }
  }
}
