const express = require('express')
const router = express.Router()

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
    const token = req.headers.authorization;

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
            res.status(500).json({ message: "server logout faild" })
        }
    }
    else {
        res.status(404).json({ message: "token not found" });
    }

})

module.exports = router;