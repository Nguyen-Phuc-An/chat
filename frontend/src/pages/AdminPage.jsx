import { useState } from "react";
import API from "../services/api";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [medias, setMedias] = useState([]);

  const handleLogin = async () => {
    if (password !== "admin123456789") {
      alert("Sai mật khẩu");
      return;
    }

    setOk(true);

    // 🔥 gọi API lấy media
    const res = await API.get("/admin/media", {
      headers: {
        "x-admin-key": "123456",
      },
    });
    setMedias(res.data);
  };

  if (!ok) {
    return (
      <div style={{ padding: 20 }}>
        <h3>Admin login</h3>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Danh sách media</h2>

      {medias.map((m, i) => (
        <div key={i}>
          {m.type === "video" ? (
            <video src={`http://localhost:5000/media/${m._id}`} controls width="300" />
          ) : (
            <img src={`http://localhost:5000/media/${m._id}`} width="200" />
          )}
        </div>
      ))}
    </div>
  );
}