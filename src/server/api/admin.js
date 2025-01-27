// admin router

const express = require("express");
const adminRouter = express.Router();
const db = require("../db");

const { isAdmin } = require("../middleware/auth");

adminRouter.get("/users", isAdmin, async (req, res, next) => {
  try {
    const users = await db.users.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/artists", isAdmin, async (req, res, next) => {
  try {
    const { name, bio, genre, img } = req.body;
    const artist = await db.artists.createArtistByAdmin({
      name,
      bio,
      genre,
      img,
    });
    res.json(artist);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/records", isAdmin, async (req, res, next) => {
  try {
    const { genre, artist_id, title, price, newRecord, img } = req.body;
    const record = await db.records.createRecordByAdmin({
      genre,
      artist_id,
      title,
      price,
      newRecord,
      img,
    });
    res.json(record);
  } catch (error) {
    next(error);
  }
});

module.exports = adminRouter;
