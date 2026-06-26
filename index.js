const axios = require("axios");
const { MongoClient } = require("mongodb");

// MongoDB Connection
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "myDatabase";
const collectionName = "myCollection";

async function fetchAndStoreData() {
  try {
    const response = await axios.get("https://example-api.com/data"); // Your API here
    const data = response.data;

    await client.connect();
    const db = client.db(dbName);

    // Insert new data
    await db.collection(collectionName).insertMany(data);

    console.log("✔ Data fetched and stored at:", new Date().toLocaleTimeString());
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
  }
}

// Run every 1 minute
setInterval(fetchAndStoreData, 60 * 1000);

fetchAndStoreData();
