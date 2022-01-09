const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", auth, async (req, res) => {
  const saveComment = await prisma.comments.create({
    data: {
      parentId: req.body.parentId,
      title: req.body.title,
      content: req.body.content,
      postId: {
        create: {},
      },
    },
  });

  if (saveComment) {
    res.status(201).json(saveComment);
  } else {
    res.status(500).json({ message: "server save comment faild" });
  }
});

module.exports = router;
