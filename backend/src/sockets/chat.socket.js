const Message = require("../models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    // 🟢 join room
    socket.on("joinRoom", async ({ roomId, username }) => {
      try {
        // leave room cũ
        if (socket.roomId) {
          socket.leave(socket.roomId);
        }

        socket.join(roomId);
        socket.roomId = roomId;
        socket.username = username;

        // 🔥 load tin nhắn 24h
        const messages = await Message.find({ roomId })
          .sort({ createdAt: 1 });

        socket.emit("oldMessages", messages);
      } catch (err) {
        console.error(err);
      }
    });

    // 🟢 gửi text
    socket.on("message", async (text) => {
      try {
        const newMsg = await Message.create({
          text,
          roomId: socket.roomId,
          username: socket.username,
        });

        // gửi cho người khác
        socket.to(socket.roomId).emit("message", newMsg);

        // gửi lại cho chính nó (để có time + username chuẩn)
        socket.emit("message", newMsg);
      } catch (err) {
        console.error(err);
      }
    });

    // 🟢 gửi media
    socket.on("media", async (mediaId) => {
      try {
        const newMsg = {
          mediaId,
          roomId: socket.roomId,
          username: socket.username,
          createdAt: new Date(),
          type: "media",
        };

        socket.to(socket.roomId).emit("media", newMsg);
        socket.emit("media", newMsg);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};