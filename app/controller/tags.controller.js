import dbPool from "../lib/dbConnect.js";

export const getTags = async (req, res, next) => {
  try {
    const tags = await dbPool.query("SELECT * FROM Tags");

    res.json({
      status: 200,
      data: tags[0],
    });
  } catch (error) {
    next(error);
  }
};

export const createTag = async (req, res, next) => {
  try {
    const { tagID, TagName } = req.body;

    const [createdTag] = await dbPool.query("INSERT INTO Tags (TagID, TagName) VALUES (?, ?)", [tagID, TagName]);

    res.status(201).json({
      status: 201,
      data: createdTag,
    });
  } catch (error) {
    next(error);
  }
};
