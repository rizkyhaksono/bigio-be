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
    const { tag_id, tag_name } = req.body;

    const [createdTag] = await dbPool.query("INSERT INTO Tags (tag_id, tag_name) VALUES (?, ?)", [tag_id, tag_name]);

    res.status(201).json({
      status: 201,
      data: createdTag,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const { tagName } = req.body;

    const [result] = await pool.query("UPDATE Tags SET tag_name = ? WHERE tag_id = ?", [tagName, tagId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag updated successfully" });
  } catch (error) {
    handleMySQLError(res, error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const { tagId } = req.params;

    const [result] = await pool.query("DELETE FROM Tags WHERE tag_id = ?", [tagId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    handleMySQLError(res, error);
  }
};
