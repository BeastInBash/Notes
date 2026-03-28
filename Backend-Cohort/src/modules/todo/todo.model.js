import mongoose from "mongoose";
const { Schema } = mongoose
const todoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: 10,
        required: [true, "Todo title is required"]
    },

    description: {
        type: String,
        trim: true,
        minlength: 10,
        required: [true, "Todo description is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })
export default mongoose.model("Todo", todoSchema)
