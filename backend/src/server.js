require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const mediaRoutes = require("./routes/media.routes");
const adminRoutes = require("./routes/admin.routes");
const chatSocket = require("./sockets/chat.socket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

connectDB();

app.use(cors());
app.use(express.json());

app.use("/media", mediaRoutes);
app.use("/admin", adminRoutes);

chatSocket(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});