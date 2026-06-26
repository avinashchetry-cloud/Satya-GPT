const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

app.get("/news", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("myDatabase");
        const collection = db.collection("myCollection");

        const data = await collection.find({}).limit(10).toArray();
        res.json(data);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
