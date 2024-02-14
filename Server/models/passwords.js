import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const passwordSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Password = mongoose.model("Password", passwordSchema);
export default Password;
