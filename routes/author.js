require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.on("connect", () => {
    console.log("Connected to the database");
});

module.exports = client;