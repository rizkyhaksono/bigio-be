import { Router } from "express";
import { getStories, createStory, updateStory, deleteStory } from "../controller/stories.controller.js";
import { getStatus, createStatus, updateStatus, deleteStatus } from "../controller/statuses.controller.js";
import { getTags, createTag, updateTag, deleteTag } from "../controller/tags.controller.js";
import { getStoryTags, createStoryTag, updateStoryTag, deleteStoryTag } from "../controller/storytag.controller.js";
import { getChapter, createChapter, updateChapter, deleteChapter } from "../controller/chapter.controller.js";
import multer from "multer";
import path from "path";

const router = Router({ strict: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/stories", getStories);
router.post("/stories", createStory);
router.put("/stories/:id", updateStory);
router.delete("/stories/:id", deleteStory);

router.get("/status", getStatus);
router.post("/status", createStatus);
router.put("/status/:id", updateStatus);
router.delete("/status/:id", deleteStatus);

router.get("/tags", getTags);
router.post("/tags", createTag);
router.put("/tags/:id", updateTag);
router.delete("/tags/:id", deleteTag);

router.get("/story_tag", getStoryTags);
router.post("/story_tag", createStoryTag);
router.put("/story_tag/:id", updateStoryTag);
router.delete("/story_tag/:id", deleteStoryTag);

router.get("/chapter", getChapter);
router.post("/chapter", createChapter);
router.put("/chapter/:id", updateChapter);
router.delete("/chapter/:id", deleteChapter);

router.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    status: 200,
    message: "Image uploaded successfully",
    filename: req.file.filename,
  });
});

// TODO 3 IMAGE (Express Multer)
// TODO 5 UNIT TESTING JEST

export default router;
