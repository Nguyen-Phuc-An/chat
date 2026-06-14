import socket from "../services/socket";
import API from "../services/api";

import ChatBox from "../components/ChatBox";
import Message from "../components/Message";
import MediaMessage from "../components/MediaMessage";
import RoomSelector from "../components/RoomSelector";
import UsernameModal from "../components/UsernameModal";
import { useEffect, useState, useRef } from "react";

export default function ChatPage() {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          type: "text",
          data: msg.text,
          username: msg.username,
          time: msg.createdAt,
          me: msg.username === username, // 🔥 FIX
        },
      ]);
    });

    socket.on("media", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          type: "media",
          data: msg.mediaId,
          username: msg.username,
          time: msg.createdAt,
          me: msg.username === username,
        },
      ]);
    });

    // ✅ FIX: đặt đúng chỗ
    socket.on("oldMessages", (msgs) => {
      const formatted = msgs.map((m) => ({
        type: "text",
        data: m.text,
        username: m.username,
        time: m.createdAt,
        me: m.username === username,
      }));

      setMessages(formatted);
    });

    return () => {
      socket.off("message");
      socket.off("media");
      socket.off("oldMessages");
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setUsername(saved);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const saved = sessionStorage.getItem("username");
    if (saved) {
      setUsername(saved);
    }
  }, []);

  const handleSetUsername = (name) => {
    sessionStorage.setItem("username", name); // 🔥 lưu theo tab
    setUsername(name);
  };

  const joinRoom = (roomId) => {
    setRoom(roomId);
    setMessages([]);

    socket.emit("joinRoom", {
      roomId,
      username,
    });
  };

  const sendMessage = (text) => {
    socket.emit("message", text);
  };

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("roomId", room);

    const res = await API.post("/media/upload", formData);
    socket.emit("media", res.data.mediaId);
  };
  if (!username) {
    return <UsernameModal onSubmit={handleSetUsername} />;
  }
  return (
    <div className="app">
      <RoomSelector onSelect={joinRoom} />

      <div className="chat-container">
        <div className="chat-header">
          <h3>{room || "Chưa chọn phòng"}</h3>
        </div>

        <div className="messages">
          {messages.map((msg, i) =>
            msg.type === "text" ? (
              <Message
                key={i}
                text={msg.data}
                username={msg.username}
                time={msg.time}
                isMe={msg.me}
              />
            ) : (
              <MediaMessage
                key={i}
                mediaId={msg.data}
                username={msg.username}
                time={msg.time}
                isMe={msg.me}
              />
            )
          )}
          {/* 🔥 điểm cuối */}
          <div ref={bottomRef}></div>
        </div>

        {room && (
          <ChatBox onSend={sendMessage} onSendFile={sendFile} />
        )}
      </div>
    </div>
  );
}