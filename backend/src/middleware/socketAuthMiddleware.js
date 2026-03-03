import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // 🔥 Get cookie from headers (NOT from auth)
    const cookie = socket.handshake.headers.cookie;

    if (!cookie) {
      console.log("No cookie found");
      return next(new Error("Authentication error: No cookie found"));
    }

    // 🔥 Extract JWT from cookie
    const token = cookie
      .split(";")
      .find((row) => row.trim().startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("No token provided");
      return next(new Error("Authentication error: No token provided"));
    }

    // 🔥 Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // 🔥 Find user in DB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // 🔥 Attach user to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `Socket authenticated for user: ${user.fullName} (${user._id})`
    );

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};