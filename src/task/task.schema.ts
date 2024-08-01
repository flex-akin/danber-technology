import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    dueDate: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
})

export const TaskModel = mongoose.model("Task", TaskSchema)