const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", auth, async (req, res) => {
  try {
    const savePost = await prisma.posts.create({
      data: {
        authorId: req.userId,
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        summary: req.body.summary,
        content: req.body.content,
        PostCategory: {
          create: [
            {
              Category: {
                connect: {
                  id: req.body.catId,
                },
              },
            },
          ],
        },
      },
      select: {
        id: true,
        title: true,
        metaTitle: true,
        summary: true,
        content: true,
      },
    });

    if (savePost) {
      res.status(201).json(savePost);
    } else {
      res.status(500).json({ message: "server error post create faild" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const editPost = await prisma.posts.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: req.body.title,
          metaTitle: req.body.metaTitle,
          summary: req.body.summary,
          content: req.body.content,
        },
        select: {
          id: true,
          title: true,
          metaTitle: true,
          summary: true,
          content: true,
        },
      });
      if (editPost) {
        res.status(201).json({ message: "updated" });
      } else {
        res.status(500).json({ message: "server update faild" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } else {
    res.status(400).json({ message: "bad request no id send " });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const getAllPosts = await prisma.posts.findMany({});

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

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await prisma.posts.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (deletePost) {
      res.status(200).json({ delete: true });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
