import { HTTP_STATUSES } from "../statuses.js";
import { favorites } from "../db.js";

export const getFavorites = (req, res) => {
  let foundFavorites = [...favorites];

  if (req.query.name) {
    foundFavorites = foundFavorites.filter((item) =>
      item.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }

  res.status(HTTP_STATUSES.OK_200).json(foundFavorites);
};

export const addFavorite = async (req, res) => {
  try {
    const newFavorite = req.body;
    const { id, name, image, gender, status, species } = newFavorite;

    if (!id || !name || !image || !gender || !status || !species) {
      return res
        .status(HTTP_STATUSES.BAD_REQUEST_400)
        .json({ message: "Not enough data!" });
    }

    const foundId = favorites.find((t) => t.id === id);
    if (foundId) {
      return res
        .status(HTTP_STATUSES.CONFLICT_409)
        .json({ message: "Favorite with this ID already exists!" });
    }

    favorites.push(newFavorite);
    res.status(HTTP_STATUSES.CREATED_201).json(newFavorite);
  } catch (error) {
    res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
      message: "Error while adding new favorite",
      error: error.message,
    });
  }
};

export const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("favorites", favorites);

  const foundFavoriteIndex = favorites.findIndex((t) => t.id === +id);

  if (foundFavoriteIndex === -1) {
    return res
      .status(HTTP_STATUSES.NOT_FOUND_404)
      .json({ message: "Favorite was not found!" });
  }

  favorites.splice(foundFavoriteIndex, 1);

  res
    .status(HTTP_STATUSES.OK_200)
    .json({ message: "Favorite was removed", favorites });
};
