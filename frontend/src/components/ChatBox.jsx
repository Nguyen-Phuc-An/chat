import { useState } from "react";

export default function ChatBox({ onSend, onSendFile }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const message = text.trim();

    // 🔥 chặn gửi rỗng
    if (!message) return;

    onSend(message);
    setText("");
  };

  return (
    <div className="chat-box">
      <input
        type="text"
        value={text}
        placeholder="Nhập tin nhắn..."
        onChange={(e) => setText(e.target.value)}

        // 🔥 Enter cũng bị chặn nếu rỗng
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button onClick={handleSend}>
        Gửi
      </button>

      <label className="upload-btn">
        📷
        <input
          type="file"
          hidden
          onChange={(e) => {
            if (!e.target.files[0]) return; // 🔥 chặn nếu không có file
            onSendFile(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
}