import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
    },
    rolname: {
        type: String,
        trim: true
    }

}, {
    timestamps: true
});

export default models.User || model('User', userSchema)
