import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import itemsRoutes from "./modules/items/items.routes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/items", itemsRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Lookeo API funcionando" });
});

app.use(notFound);
app.use(errorHandler);
