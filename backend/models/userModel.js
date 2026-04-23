import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); //add automatically createdAt and update



// Encrypt password before saving
userSchema.pre("save", async function () {

    // if password is not modified, stop
    if (!this.isModified("password")) return;

    try {
        const salt = await bcrypt.genSalt(10);
        // crypt the password directly on object "this"
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        // in async function, errors are directly thrown
        throw new Error(err);
    }
});



const User = mongoose.model("User", userSchema);




export default User;