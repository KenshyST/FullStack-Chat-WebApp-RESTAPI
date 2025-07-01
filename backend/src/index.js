//const express = require("express"); // Asi esta si no cambiamos en package.json type:modules
import express from "express"; // Importando express como un módulo
import authRoutes from "./routes/auth.route.js"; // Importando las rutas de autenticación
import messageRoutes from "./routes/message.route.js"; // Importando las rutas de mensajes
import dotenv from "dotenv"; // Importando dotenv para manejar variables de entorno
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"; // Importando cookie-parser para manejar cookies
import cors from "cors";
import { app, httpServer } from "./lib/socketIO.js";
import path from "path";

dotenv.config(); // Cargando las variables de entorno desde el archivo .env

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); // Middleware para parsear JSON en las solicitudes
app.use(cookieParser()); // Middleware para parsear cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/:path(*)", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

httpServer.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB(); // Conectando a la base de datos
});
