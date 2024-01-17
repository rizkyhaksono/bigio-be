import { Router } from "express";
import { getStories, createStory, updateStory, deleteStory } from "../controller/stories.controller.js";
import { getStatus, createStatus, updateStatus, deleteStatus } from "../controller/statuses.controller.js";
import { getTags, createTag } from "../controller/tags.controller.js";
import { getStoryTags, createStoryTag, deleteStoryTag } from "../controller/storytag.controller.js";

const router = Router({ strict: true });

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

router.get("/story_tag", getStoryTags);
router.post("/story_tag", createStoryTag);
router.delete("/story_tag", deleteStoryTag);

export default router;
