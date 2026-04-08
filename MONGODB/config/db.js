import mongoose from "mongoose";

const connectDb = () => {
    mongoose.connect("mongodb://localhost:27017/myapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });
}

export default connectDb;