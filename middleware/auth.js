const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'no token send!!!' });
    }
    else {
        const findToken = await prisma.session.findUnique({
            where: {
                token: req.headers.authorization,
            },
            select: {
                uid: true
            }
        })
        if (findToken != null) {

            next();
        }
        else {
            res.status(401).json({ message: "token invalid" });
        }
    }
}

module.exports = auth
