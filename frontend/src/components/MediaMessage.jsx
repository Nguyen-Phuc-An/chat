export default function MediaMessage({ mediaId, isMe }) {
  const url = `http://localhost:5000/media/${mediaId}`;

  const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className={`message ${isMe ? "me" : ""}`}>
      <div className="media">
        {isVideo ? (
          <video src={url} controls width="250" />
        ) : (
          <img src={url} alt="media" />
        )}
      </div>
    </div>
  );
}