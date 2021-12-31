function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'no token send!!!' });
    }
    else {
        res.json(req.headers.authorization);
    }
    next();
}

module.exports = auth
