const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const getAllPosts = await prisma.posts.findMany({
      select: {
        id: true,
        title: true,
        updatedAt: true,
        createdAt: true,
        metaTitle: true,
        summary: true,
        published: true,
        content: true,
        PostCategory: {
          select: {
            Category: true,
          },
        },
        users: {
          select: {
            username: true,
          },
        },
      },
    });

    if (getAllPosts) {
      res.status(200).json(getAllPosts);
    } else {
      res.status(500).json({ message: "server getPost faild" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const getPost = await prisma.posts.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
        createdAt: true,
        metaTitle: true,
        summary: true,
        published: true,
        content: true,
        PostCategory: {
          select: {
            Category: true,
          },
        },
        users: {
          select: {
            username: true,
          },
        },
      },
    });

    if (getPost) {
      res.status(200).json(getPost);
    } else {
      res.status(400).json({ message: "post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
