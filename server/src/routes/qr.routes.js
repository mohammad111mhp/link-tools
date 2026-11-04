import { Router } from "express";
import {
	deleteMultipleQrs,
	deleteQr,
	generatePersistentQr,
	generatePreviewQr,
	getQr,
	getQRCodes,
} from "../controllers/qr.controller.js";

const router = Router();
router.post("/", generatePersistentQr);
router.get("/", getQRCodes);
router.get("/:name", getQr);
router.post("/preview", generatePreviewQr);
router.delete("/bulk-delete", deleteMultipleQrs);
router.delete("/:id", deleteQr);

export default router;
