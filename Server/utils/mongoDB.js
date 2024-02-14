import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect("mongodb://localhost:27017/passwordGenerator")
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Error Connecting DB", err.message));
};
