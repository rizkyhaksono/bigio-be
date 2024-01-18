import dbPool from "../lib/dbConnect.js";

export const getChapter = async (req, res, next) => {
  try {
    const chapter = await dbPool.query("SELECT * FROM Chapter");

    res.json({
      status: 200,
      data: chapter[0],
    });
  } catch (error) {
    next(error);
  }
};

export const createChapter = async (req, res, next) => {
  try {
    const { title, story, story_id } = req.body;

    // Insert new chapter into the CHAPTER table
    const [createdChapter] = await dbPool.query("INSERT INTO Chapter (title, story, story_id) VALUES (?, ?, ?)", [title, story, story_id]);

    res.status(201).json({
      status: 201,
      data: createdChapter,
    });
  } catch (error) {
    next(error);
  }
};

export const updateChapter = async (req, res, next) => {
  try {
    const { CHAPTER_ID } = req.params;
    const { TITLE, STORY, StoryID } = req.body;

    // Update the chapter in the CHAPTER table
    const [updatedChapter] = await dbPool.query("UPDATE CHAPTER SET title = ?, story = ?, story_id = ? WHERE chapter_id = ?", [TITLE, STORY, StoryID, CHAPTER_ID]);

    res.json({
      status: 200,
      data: updatedChapter,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChapter = async (req, res, next) => {
  try {
    const { CHAPTER_ID } = req.params;

    // Delete the chapter from the CHAPTER table
    await dbPool.query("DELETE FROM CHAPTER WHERE chapter_id = ?", [CHAPTER_ID]);

    res.json({
      status: 200,
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
