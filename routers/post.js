const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient;


router.post("/", auth, async (req, res) => {

    const findUser = await prisma.session.findUnique({
        where: {
            token: req.headers.authorization
        },
        select: {
            uid: true
        }
    })

    if (findUser) {
        const savePost = await prisma.posts.create({
            data: {
                authorId: findUser.uid,
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
                content: true
            }
        })

        if (savePost) {
            res.status(201).json(savePost);
        }
        else {
            res.status(500).json({ message: "server error post create faild" });
        }
    }
    else {
        res.status(400).json({ message: "bad request" });
    }





})

router.get("/a", (req, res) => {

    res.status(200)

})

router.get("/new", (req, res) => {
    res.send("posts new");
})


module.exports = router;