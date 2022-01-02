const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
    const token = req.headers.authorization;

    const logout = await prisma.session.delete({
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
})

module.exports = router;