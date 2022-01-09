const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const userlist = await prisma.users.findMany();
  res.status(200).json(userlist);
});

router.post("/", async (req, res) => {
  const { username } = req.body;
  const newUser = req.body;

  const userExist = await prisma.users.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });

  if (userExist) {
    return res.status(400).json({ msg: "user alreay exist" });
  } else {
    var hashPassword = await bcrypt.hash(newUser.passwrod, 10);
    const createUser = await prisma.users.create({
      data: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        mobile: newUser.mobile,
        email: newUser.email,
        password: hashPassword,
      },
      select: {
        username: true,
        firstName: true,
        lastName: true,
        mobile: true,
        email: true,
      },
    });

    res.status(201).json(createUser);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  //res.json(req.body);
  const selectUser = await prisma.users.update({
    where: {
      id: Number(id),
    },
    data: {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      mobile: updateData.mobile,
      email: updateData.email,
      passwrod: updateData.passwrod,
      profileImage: updateData.profileImage,
    },
  });
  res.status(200).json(selectUser);
});

module.exports = router;
