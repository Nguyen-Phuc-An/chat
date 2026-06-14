export default function Message({ text, username, time, isMe }) {
  const formatTime = (t) => {
    if (!t) return ""; // tránh lỗi

    const date = new Date(t);

    if (isNaN(date.getTime())) return ""; // tránh Invalid Date

    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`message ${isMe ? "me" : ""}`}>
      
      {/* 🔥 tên */}
      <div style={{ fontSize: 12, fontWeight: "bold" }}>
        {username}
      </div>

      {/* nội dung */}
      <div>{text}</div>

      {/* 🔥 thời gian */}
      <div style={{ fontSize: 10, opacity: 0.6 }}>
        {new Date(time).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

    </div>
  );
}