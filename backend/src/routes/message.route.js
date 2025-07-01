import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSideBar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar); // Obtener mensajes entre el usuario autenticado y el receptor
router.get("/:id", protectRoute, getMessages); // Obtener mensajes entre el usuario autenticado y el receptor

router.post("/send/:receiverId", protectRoute, sendMessage); // Enviar un mensaje al receptor

export default router;
