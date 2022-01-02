const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", auth, async (req, res) => {
  try {
    const saveCategory = await prisma.category.create({
      data: {
        parentId: req.body.parentId,
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        content: req.body.content,
      },
    });

    if (saveCategory) {
      res.status(201).json(saveCategory);
    } else {
      res.status(500).json({ message: "server saveCategory faild" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const getCategory = await prisma.category.findMany();

    if (getCategory) {
      res.status(200).json(getCategory);
    } else {
      res.status(500).json({ message: "server getCategory feild" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  {
    try {
      const deleteCategory = await prisma.category.delete({
        where: {
          id: parseInt(id),
        },
      });

      if (deleteCategory) {
        res.status(200).json({ delete: true });
      } else {
        res.status(500).json({ message: "sever deleteCategory faild" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const updateCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        parentId: req.body.parentId,
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        content: req.body.content,
      },
    });

    if (updateCategory) {
      res.status(200).json(updateCategory);
    } else {
      res.status(500).json({ message: "server update faild" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
