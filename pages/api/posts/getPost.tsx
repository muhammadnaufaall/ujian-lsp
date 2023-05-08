import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // get all posts

    try {
      const result = await prisma.post.findMany({
        include: {
          user: true,
          Comment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json({ message: "All Posts", result });
    } catch (error) {
      res.status(403).json({ message: "Something went wrong" });
    }
  }
}
