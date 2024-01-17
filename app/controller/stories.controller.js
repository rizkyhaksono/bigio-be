import dbPool from "../lib/dbConnect.js";

export const getStories = async (req, res, next) => {
  try {
    const stories = await dbPool.query("SELECT * FROM Stories");

    res.json({
      status: 200,
      data: stories[0],
    });
  } catch (error) {
    next(error);
  }
};

export const createStory = async (req, res, next) => {
  try {
    const { title, author, category, statusID } = req.body;

    const [statusResult] = await dbPool.query("SELECT * FROM Statuses WHERE StatusID = ? ", [statusID]);

    if (statusResult.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Status not found",
      });
    }

    const [createdStory] = await dbPool.query("INSERT INTO Stories (Title, Author, Category, StatusID) VALUES (?, ?, ?, ?)", [title, author, category, statusID]);

    res.status(201).json({
      status: 201,
      data: createdStory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStory = async (req, res, next) => {
  try {
    const storyId = req.params.id;
    const { title, author, category, statusID } = req.body;

    const [existingStory] = await dbPool.query("SELECT * FROM Stories WHERE StoryID = ?", [storyId]);

    if (existingStory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story not found",
      });
    }

    const [statusResult] = await dbPool.query("SELECT * FROM Statuses WHERE StatusID = ?", [statusID]);

    if (statusResult.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Status not found",
      });
    }

    await dbPool.query("UPDATE Stories SET Title = ?, Author = ?, Category = ?, StatusID = ? WHERE StoryID = ?", [title, author, category, statusID, storyId]);

    res.json({
      status: 200,
      message: "Story updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    const storyId = req.params.id;

    const [existingStory] = await dbPool.query("SELECT * FROM Stories WHERE StoryID = ?", [storyId]);

    if (existingStory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story not found",
      });
    }

    await dbPool.query("DELETE FROM Stories WHERE StoryID = ?", [storyId]);

    res.json({
      status: 200,
      message: "Story deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
