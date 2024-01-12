import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminRoutes from "./routes/Admin.js"
import AuthorRoutes from "./routes/Author.js"
import UserRoutes from "./routes/User.js"
/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`mongoDb is Connected \nServer Port: ${PORT}`));

  
  })
  .catch((error) => console.log(`${error} did not connect`));
  
/* ROUTES */
app.use("/Admin", AdminRoutes);
app.use("/Author", AuthorRoutes);
app.use("/User", UserRoutes);
