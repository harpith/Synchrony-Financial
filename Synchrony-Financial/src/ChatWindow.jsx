import React, { useRef, useState } from "react";

const ChatWindow = ({ chat, addMessage }) => {
  const fileInputRef = useRef();
  const [input, setInput] = useState("");

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addMessage({
        type: "file",
        name: file.name,
        size: file.size,
        time: new Date().toLocaleTimeString(),
      });
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      addMessage({
        type: "text",
        text: input,
        time: new Date().toLocaleTimeString(),
      });
      setInput("");
      // Here you can call GPT API and add its response as a message
    }
  };

  return (
    <div className="chat-window-custom d-flex flex-column">
      {/* Chat header */}
      <div className="bg-secondary text-white px-4 py-3 rounded-top d-flex align-items-center justify-content-between shadow-sm">
        <h5 className="mb-0">{chat?.title || "Chat"}</h5>
        <span className="badge bg-dark text-white">FAQ CHATBOT</span>
      </div>

      {/* Chat messages area */}
      <div className="flex-grow-1 overflow-auto px-4 py-3 bg-dark" style={{ minHeight: 0 }}>
        <div className="d-flex flex-column gap-3">
          <div className="align-self-start">
            <div className="bg-secondary text-white rounded-pill shadow-sm px-3 py-2">
              <strong>FAQ:</strong> Welcome! Upload a file or ask a question.
            </div>
          </div>
          {chat?.messages?.map((msg, idx) =>
            msg.type === "text" ? (
              <div key={idx} className="align-self-end">
                <div className="bg-primary text-white rounded-pill shadow-sm px-3 py-2">
                  <span>{msg.text}</span>
                  <span className="ms-2 small text-light">{msg.time}</span>
                </div>
              </div>
            ) : (
              <div key={idx} className="align-self-end">
                <div className="bg-info text-dark rounded-pill shadow-sm px-3 py-2">
                  <i className="fas fa-file-alt me-2"></i>
                  <span>{msg.name} ({Math.round(msg.size/1024)} KB)</span>
                  <span className="ms-2 small text-dark">{msg.time}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Chat input area */}
      <div className="bg-black px-3 py-3 border-top d-flex align-items-center gap-2">
        {/* File upload icon */}
        <span
          className="input-group-text bg-dark border-0 text-white"
          style={{ cursor: "pointer" }}
          onClick={handleFileClick}
          title="Upload Document"
        >
          <i className="fas fa-paperclip"></i>
        </span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: "none" }}
        />

        {/* Text input */}
        <input
          type="text"
          className="form-control rounded-pill bg-dark text-white border-secondary"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />

        {/* Send button */}
        <button className="btn btn-secondary rounded-pill px-4 text-white" onClick={handleSend}>
          <i className="fas fa-paper-plane me-2"></i>Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;


