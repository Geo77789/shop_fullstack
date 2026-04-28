import mongoose from "mongoose";
import bcrypt from "bcryptjs";



// User, Admin Schema

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
    },

    address: {
        type: String,
        default: ""
    },

    firstName: {
        type: String,
        default: ""
    },

    lastName: {
        type: String,
        default: ""
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false

    }

}, { timestamps: true }); //add automatically createdAt and update



// Encrypt password before saving
userSchema.pre("save", async function (next) {

    // if password is not modified, stop
    if (!this.isModified("password")) {
        return next();
    };

    try {
        const salt = await bcrypt.genSalt(10); // 10 rounds of complexity
        // crypt the password directly on object "this"
        this.password = await bcrypt.hash(this.password, salt); // mix with salt and scrypt 
    } catch (err) {
        // in async function, errors are directly thrown
        next(err);
    }


});
// Compare the password when user login
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

const User = mongoose.model("User", userSchema);




export default User;