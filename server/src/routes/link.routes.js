import { Router } from "express";
import {
	deleteLink,
	deleteMultipleLinks,
	getLinks,
	shortenLink,
} from "../controllers/link.controller.js";

const router = Router();
router.post("/", shortenLink);
router.get("/", getLinks);
router.delete("/bulk-delete", deleteMultipleLinks);
router.delete("/:id", deleteLink);

export default router;
