import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("Unauthorized, no token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send("Unauthorized, invalid token");
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).send("Unauthorized, user not found");
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).send("Internal server error");
  }
};
