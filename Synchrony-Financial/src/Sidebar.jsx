// import React from "react"

// const Sidebar = ({ chats, onNewChat, onSelectChat, activeChatId }) => {
//   return (
//     <div className="sidebar-custom d-flex flex-column">
//       <button className="btn btn-outline-light mb-3" onClick={onNewChat}>
//         + New Chat
//       </button>

//       <div className="flex-grow-1 overflow-auto">
//         {chats.map(chat => (
//           <div
//             key={chat.id}
//             onClick={() => onSelectChat(chat.id)}
//             className={`p-2 mb-2 rounded sidebar-chat-item ${activeChatId === chat.id ? "bg-secondary text-white" : "bg-dark text-white"}`}
//             style={{ cursor: "pointer" }}
//           >
//             {chat.title}
//           </div>
//         ))}
//       </div>

//       <div className="mt-3">
//         <hr className="border-light" />
//         <p className="text-light text-center fw-bold">FAQ CHATBOT</p>
//       </div>
//     </div>
//   )
// }

// export default Sidebar


import React, { useState } from "react"

const Sidebar = ({ chats, onNewChat, onSelectChat, activeChatId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTimeAgo = (chatId) => {
    const timeDiff = Date.now() - chatId;
    const minutes = Math.floor(timeDiff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <div className="sidebar-custom">
      {/* Header */}
      <div className="sidebar-header">
        <div className="profile">
          <div className="profile-icon">
            <i className="fas fa-robot"></i>
          </div>
          <div className="profile-info">
            <h6>FAQ Bot</h6>
            <small>AI Assistant</small>
          </div>
        </div>

        <button className="btn-new-chat" onClick={onNewChat}>
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          New Chat
        </button>

        <input
          type="text"
          className="search-input"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Chat List */}
      <div className="chat-list">
        {filteredChats.length === 0 && searchTerm ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
            <i className="fas fa-search" style={{ marginBottom: '8px' }}></i>
            <div>No chats found</div>
          </div>
        ) : (
          filteredChats.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${activeChatId === chat.id ? 'active' : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="chat-item-title">
                {chat.title}
              </div>
              <div className="chat-item-meta">
                <span>
                  <i className="fas fa-comment-dots" style={{ fontSize: '10px', marginRight: '4px' }}></i>
                  {chat.messages?.length || 0} messages
                </span>
                <span>{getTimeAgo(chat.id)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="brand">FAQ CHATBOT</div>
        <div className="tagline">Powered by AI</div>
      </div>
    </div>
  )
}

export default Sidebar