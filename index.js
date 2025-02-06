import express from "express";
import cors from "cors";
import { router } from "./routes/favorites.js";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/favorites", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
