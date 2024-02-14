import express from "express";
import cors from "cors";
import { connectDB } from "./utils/mongoDB.js";
import {
  deletePassword,
  generatePassword,
  getPasswords,
} from "./controllers/passwordController.js";
import { login, register } from "./controllers/userController.js";

const app = express();
const options = {
  origin: " http://localhost:5173",
  method: ["GET,POST,DELETE"],
};

app.use(express.json());
app.use(cors(options));

app.post("/genetratePass", generatePassword);
app.post("/login", login);
app.post("/register", register);
app.get("/getPasswords/:id", getPasswords);
app.delete("/deletePassword/:id/:user", deletePassword);

app.listen(5000, () => {
  connectDB();
  console.log("Server started");
});
