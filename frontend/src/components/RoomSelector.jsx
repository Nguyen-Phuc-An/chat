export default function RoomSelector({ onSelect }) {
  return (
    <div className="sidebar">
      <h3>Phòng chat</h3>
      <button className="room-btn" onClick={() => onSelect("Chat chung")}>
        Chat chung
      </button>
      <button className="room-btn" onClick={() => onSelect("18+")}>
        18+
      </button>
      <button className="room-btn" onClick={() => onSelect("Lesbian")}>
        Lesbian
      </button>
      <button className="room-btn" onClick={() => onSelect("Gay")}>
        Gay
      </button>
    </div>
  );
}