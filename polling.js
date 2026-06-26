const axios = require('axios');
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function pollAPI() {
  try {
    const response = await axios.get("https://example-api.com/data"); // enter API
    const data = response.data;

    await client.connect();
    const db = client.db("myDatabase");
    const collection = db.collection("myCollection");

    // Insert only if no duplicate guid
    for (const item of data) {
      await collection.updateOne(
        { guid: item.guid }, 
        { $set: item }, 
        { upsert: true } // insert if not exist
      );
    }

    console.log("Database updated at:", new Date());
  } catch (error) {
    console.error("Polling error:", error.message);
  }
}

// Poll every 5 minutes (300000 ms)
setInterval(pollAPI, 60 * 1000);

pollAPI(); // Run first time immediately