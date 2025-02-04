const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const uri = "mongodb+srv://sreeja:mongodb@cluster0.tb19n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.use(bodyParser.json());

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
connectDB();

const db = client.db("sample_mflix");
const usersCollection = db.collection("users");

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Get user by email
app.get('/users/:email', async (req, res) => {
    try {
        const user = await usersCollection.findOne({ email: req.params.email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
});

// Create new user
app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ message: "User added", userId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error inserting user" });
    }
});

// Update user by name
app.put('/users/:name', async (req, res) => {
    try {
        const updatedUser = req.body;
        const result = await usersCollection.updateOne(
            { name: req.params.name },
            { $set: updatedUser }
        );
        res.json({ message: "User updated", matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
});

// Delete user by email
app.delete('/users/:email', async (req, res) => {
    try {
        const result = await usersCollection.deleteOne({ email: req.params.email });
        res.json({ message: "User deleted", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
