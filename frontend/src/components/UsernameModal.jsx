import { useState } from "react";

export default function UsernameModal({ onSubmit }) {
  const [name, setName] = useState("");

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 10
      }}>
        <h3>Nhập tên của bạn</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ví dụ: Ẩn danh 123"
        />

        <button
          onClick={() => {
            if (!name.trim()) return;
            onSubmit(name);
          }}
        >
          Vào chat
        </button>
      </div>
    </div>
  );
}