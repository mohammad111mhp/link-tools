import { mkdir } from "fs/promises";
import { STORAGE } from "./storage.js";

export async function initializeStorage() {
	await mkdir(STORAGE.QR_DIR, {
		recursive: true,
	});
}
