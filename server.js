const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'Bearer ZEWAIL') {
        next();
    } else {
        res.status(403).send('Forbidden: Invalid Token');
    }
};



const authroutes = require('./routes/author');
const blogroutes = require('./routes/blog');

app.use('/authors', authMiddleware, authroutes);
app.use('/blog', authMiddleware, blogroutes);

app
    .listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });