import React from "react"

const Sidebar = ({ chats, onNewChat, onSelectChat, activeChatId }) => {
  return (
    <div className="sidebar-custom d-flex flex-column">
      <button className="btn btn-outline-light mb-3" onClick={onNewChat}>
        + New Chat
      </button>

      <div className="flex-grow-1 overflow-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-2 mb-2 rounded sidebar-chat-item ${activeChatId === chat.id ? "bg-secondary text-white" : "bg-dark text-white"}`}
            style={{ cursor: "pointer" }}
          >
            {chat.title}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <hr className="border-light" />
        <p className="text-light text-center fw-bold">FAQ CHATBOT</p>
      </div>
    </div>
  )
}

export default Sidebar


