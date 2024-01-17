import dbPool from "../lib/dbConnect.js";

export const getStoryTags = async (req, res, next) => {
  try {
    const storyTags = await dbPool.query("SELECT * FROM StoryTags");

    res.json({
      status: 200,
      data: storyTags[0],
    });
  } catch (error) {
    next(error);
  }
};

export const createStoryTag = async (req, res, next) => {
  try {
    const { storyId, tagId } = req.body;

    // check storyId
    const [existingStory] = await dbPool.query("SELECT * FROM Stories WHERE StoryID = ?", [storyId]);

    if (existingStory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story not found",
      });
    }

    // check tagId
    const [existingTag] = await dbPool.query("SELECT * FROM Tags WHERE TagID = ?", [tagId]);

    if (existingTag.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Tag not found",
      });
    }

    const [createdStoryTag] = await dbPool.query("INSERT INTO StoryTags (StoryID, TagID) VALUES (?, ?)", [storyId, tagId]);

    res.status(201).json({
      status: 201,
      data: createdStoryTag,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStoryTag = async (req, res, next) => {
  try {
    const { storyId, tagId } = req.body;

    const [existingStoryTag] = await dbPool.query("SELECT * FROM StoryTags WHERE StoryID = ? AND TagID = ?", [storyId, tagId]);

    if (existingStoryTag.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story tag not found",
      });
    }

    await dbPool.query("DELETE FROM StoryTags WHERE StoryID = ? AND TagID = ?", [storyId, tagId]);

    res.json({
      status: 200,
      message: "Story tag deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
