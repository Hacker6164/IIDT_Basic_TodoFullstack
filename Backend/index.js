require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { TaskModel } = require("./Models/TaskModel");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const DB_URL = process.env.MONGODB_URL;

app.get("/", async (req, res) => {
    try {
        const allTasks = await TaskModel.find({});
        res.json(allTasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/addTask", async (req, res) => {
    try {
        const newTask = TaskModel(req.body);
        await newTask.save();
        res.json({ message: "Task added successfully!!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/deleteTask/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        await TaskModel.findByIdAndDelete(taskId);
        res.json({ message: "Task deleted successfully!!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/updateTaskStatus/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        await TaskModel.findByIdAndUpdate(taskId, { status });
        res.json({ message: "Task status updated successfully!!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update task title
app.put("/updateTaskTitle/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title } = req.body;
        await TaskModel.findByIdAndUpdate(taskId, { title });
        res.json({ message: "Task title updated successfully!!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
    mongoose.connect(DB_URL);
    console.log("Connected to DB!");
});
