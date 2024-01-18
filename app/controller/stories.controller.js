import dbPool from "../lib/dbConnect.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const getStories = async (req, res, next) => {
  try {
    const stories = await dbPool.query("SELECT * FROM Stories");

    const storiesWithImageURLs = stories[0].map((story) => {
      return {
        ...story,
        image_url: story.image_path ? `https://bigio-be-production.up.railway.app/api/uploads/${story.image_path}` : null,
      };
    });

    res.json({
      status: 200,
      data: [stories[0], storiesWithImageURLs],
    });
  } catch (error) {
    next(error);
  }
};

export const createStory = async (req, res, next) => {
  try {
    const { title, author, synopsis, category, status_id, image_path } = req.body;

    const [statusResult] = await dbPool.query("SELECT * FROM Statuses WHERE status_id = ? ", [status_id]);

    if (statusResult.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Status not found",
      });
    }

    const [createdStory] = await dbPool.query("INSERT INTO Stories (title, author, synopsis, category, status_id, image_path) VALUES (?, ?, ?, ?, ?, ?)", [title, author, synopsis, category, status_id, image_path || null]);

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
    const story_id = req.params.id;
    const { title, author, category, statusID } = req.body;

    const [existingStory] = await dbPool.query("SELECT * FROM Stories WHERE story_id = ?", [story_id]);

    if (existingStory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story not found",
      });
    }

    const [statusResult] = await dbPool.query("SELECT * FROM Statuses WHERE status_id = ?", [statusID]);

    if (statusResult.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Status not found",
      });
    }

    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Error uploading image",
        });
      }

      const imagePath = req.file ? req.file.filename : null;

      await dbPool.query("UPDATE Stories SET title = ?, author = ?, category = ?, status_id = ?, image_path = ? WHERE story_id = ?", [title, author, category, statusID, imagePath, story_id]);

      res.json({
        status: 200,
        message: "Story updated successfully",
      });
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    const story_id = req.params.id;

    const [existingStory] = await dbPool.query("SELECT * FROM Stories WHERE story_id = ?", [story_id]);

    if (existingStory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Story not found",
      });
    }

    const imagePath = existingStory[0].image_path;
    if (imagePath) {
      fs.unlink(path.join(__dirname, "../../uploads", imagePath), (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        }
      });
    }

    await dbPool.query("DELETE FROM Stories WHERE story_id = ?", [story_id]);

    res.json({
      status: 200,
      message: "Story deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
