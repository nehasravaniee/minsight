const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/MindSightUserDetails")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = new mongoose.model("LogInCollections", LogInSchema);
const Feedback = new mongoose.model("Feedback", FeedbackSchema);

module.exports = { User, Feedback };