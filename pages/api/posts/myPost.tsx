import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Please Sign In" });
    }

    // get my posts
    try {
      const result = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: {
                orderBy: {
                  createdAt: "asc",
                },
              },
            },
          },
        },
      });
      res.status(200).json({ message: "All of Your Posts", result });
    } catch (error) {
      res.status(403).json({ message: "Something went wrong" });
    }
  }
}
