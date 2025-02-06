import express from "express";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../controllers/favorites.js";

export const router = express.Router();

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:id", deleteFavorite);
