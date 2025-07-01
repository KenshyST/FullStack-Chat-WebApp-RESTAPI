import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socketIO.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).send(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSideBar controller: ", error.message);
    return res.status(500).send("Internal server error");
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  try {
    const myID = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myID, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myID },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    return res.status(500).send("Internal server error");
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { contentText, image } = req.body;

    const senderId = req.user._id;
    let imageURL;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      contentText,
      image: imageURL,
    });

    await newMessage.save();

    //Notificacion con socket IO para avisar que llego un mensaje
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    return res.status(500).send("Internal server error");
  }
};
