const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const userAgent = req.get('User-Agent');

    const findUser = await prisma.users.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            password: true
        }
    })


    if (findUser) {
        const validPass = await bcrypt.compare(password, findUser.password);
        if (validPass) {
            const login = await prisma.session.create({
                data: {
                    uid: findUser.id,
                    userAgent: userAgent
                },
                select: {
                    token: true
                }
            })
            if (login) {
                res.status(200).json({ login: true, token: login.token });
            }
            else {
                res.status(500).json("server login faild");
            }
        }
        else {
            res.status(404).json({ login: false });
        }
    }
    else {
        res.status(404).json({ login: false });
    }

})

router.delete("/", async (req, res) => {
    const { token } = req.body;

    const findToken = await prisma.session.findUnique(
        {
            where: {
                token: token
            },
            select: {
                token: true
            }
        }
    )

    if (findToken) {
        const logout = await prisma.session.deleteMany({
            where: {
                token: token
            }
        })

        if (logout.count > 0) {
            res.status(200).json({ logout: true });
        }
        else {
            res.status(500).json("server logout faild")
        }
    }
    else {
        res.status(404).json("token not found");
    }

})


module.exports = router;