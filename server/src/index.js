import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import linkRoutes from "./routes/link.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import qrcodeRoutes from "./routes/qr.routes.js";

import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

import { STORAGE } from "./config/storage.js";
import { initializeStorage } from "./config/storageInit.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(
	STORAGE.QR_ROUTE,
	express.static(STORAGE.QR_DIR, {
		index: false,
		dotfiles: "deny",
		immutable: true,
		maxAge: "30d",
	}),
);

app.use("/api/v1/link", linkRoutes);
app.use("/api/v1/qrcode", qrcodeRoutes);
app.use("/", redirectRoutes);

app.use(notFound);
app.use(errorHandler);

initializeStorage();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
