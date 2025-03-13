require("dotenv").config();
const { Pool } = require("pg");
const express = require('express');
const router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
    console.log("Connected to the database");
});

// get all users
router.get('/', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// get user by id
router.get('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: "User not found "});
        }
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// create user 
router.post('/', async (req, res) => {
    try {
        const {id, name, email} = req.body;
        if (!id || !name || !email) {
            return res.status(404).json({ error: "Enter required data"});
        }
        const results = await pool.query('INSERT INTO users (id, name, email) VALUES ($1, $2, $3)', [id, name, email]);
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// update user 
router.put('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const {name, email} = req.body;
        const results = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        const results = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.status(200).json({ message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;