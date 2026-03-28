import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Name is Required"]

    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is Required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user", "dealer"],
        default: "user",

    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        select: false,
    },
    refreshToken: {
        type: String,
        select: false
    },

    resetPasswordToken: {
        type: String,
        select: false
    },

    resetPasswordExpires: {
        type: Date,
        select: false
    }


}, {
    timestamps: true
})
// Creating hook in mongoose to encrypt the password
// This hook runs on save means when the user data get saved then it will run
// to make it run only when password field is modified
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return 
    }
    this.password = await bcrypt.hash(this.password, 12)

});
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
};

export default mongoose.model("User", userSchema)
