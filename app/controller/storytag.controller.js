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
    const { story_id, tag_id } = req.body;

    // check story_id
    const [existingStory] = await dbPool.query("SELECT * FROM Stories WHERE story_id = ?", [story_id]);

    if (existingStory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story not found",
      });
    }

    // check tag_id
    const [existingTag] = await dbPool.query("SELECT * FROM Tags WHERE tag_id = ?", [tag_id]);

    if (existingTag.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Tag not found",
      });
    }

    const [createdStoryTag] = await dbPool.query("INSERT INTO StoryTags (story_id, tag_id) VALUES (?, ?)", [story_id, tag_id]);

    res.status(201).json({
      status: 201,
      data: createdStoryTag,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStoryTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const { storyId, newTagId } = req.body;

    // Check if the story tag exists
    const [existingStoryTag] = await dbPool.query("SELECT * FROM StoryTags WHERE story_id = ? AND tag_id = ?", [storyId, tagId]);

    if (existingStoryTag.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story tag not found",
      });
    }

    // Check if the new tag exists
    const [existingNewTag] = await dbPool.query("SELECT * FROM Tags WHERE tag_id = ?", [newTagId]);

    if (existingNewTag.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "New tag not found",
      });
    }

    await dbPool.query("UPDATE StoryTags SET tag_id = ? WHERE story_id = ? AND tag_id = ?", [newTagId, storyId, tagId]);

    res.json({
      status: 200,
      message: "Story tag updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStoryTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const { storyId } = req.body;

    const [existingStoryTag] = await dbPool.query("SELECT * FROM StoryTags WHERE story_id = ? AND tag_id = ?", [storyId, tagId]);

    if (existingStoryTag.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story tag not found",
      });
    }

    await dbPool.query("DELETE FROM StoryTags WHERE story_id = ? AND tag_id = ?", [storyId, tagId]);

    res.json({
      status: 200,
      message: "Story tag deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
