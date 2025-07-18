// import React, { useState } from "react"
// import Sidebar from "./Sidebar"
// import ChatWindow from "./ChatWindow"
// import "./index.css" 

// const App = () => {
//   const [chats, setChats] = useState([
//     { id: 1, title: "Welcome Chat", messages: [] }
//   ])
//   const [activeChatId, setActiveChatId] = useState(1)

//   const addNewChat = () => {
//     const newId = Date.now()
//     const newChat = { id: newId, title: "New Chat", messages: [] }
//     setChats([newChat, ...chats])
//     setActiveChatId(newId)
//   }

//   const updateTitle = (id, newTitle) => {
//     setChats(chats.map(chat => chat.id === id ? { ...chat, title: newTitle } : chat))
//   }

//   // Add message to active chat
//   const addMessage = (msg) => {
//     setChats(chats.map(chat =>
//       chat.id === activeChatId
//         ? { ...chat, messages: [...chat.messages, msg] }
//         : chat
//     ))
//   }

//   return (
//     <div className="app-root">
//       <Sidebar
//         chats={chats}
//         onNewChat={addNewChat}
//         onSelectChat={setActiveChatId}
//         activeChatId={activeChatId}
//       />
//       <ChatWindow
//         chat={chats.find(c => c.id === activeChatId)}
//         updateTitle={(title) => updateTitle(activeChatId, title)}
//         addMessage={addMessage}
//       />
//     </div>
//   )
// }

// export default App


import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import ChatWindow from "./ChatWindow"
import "./index1.css" 

const App = () => {
  const [chats, setChats] = useState([
    { 
      id: 1, 
      title: "Welcome to FAQ Bot", 
      messages: [
        {
          type: "bot",
          text: "👋 Hello! I'm your AI-powered FAQ assistant. I can help you with technical documentation, coding standards, and development processes. What would you like to know?",
          time: new Date().toLocaleTimeString()
        }
      ] 
    }
  ])
  const [activeChatId, setActiveChatId] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (window.innerWidth > 768) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const addNewChat = () => {
    const newId = Date.now()
    const newChat = { 
      id: newId, 
      title: `Chat ${chats.length + 1}`, 
      messages: [
        {
          type: "bot",
          text: "🆕 New conversation started! How can I help you today?",
          time: new Date().toLocaleTimeString()
        }
      ] 
    }
    setChats([newChat, ...chats])
    setActiveChatId(newId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const updateTitle = (id, newTitle) => {
    setChats(chats.map(chat => chat.id === id ? { ...chat, title: newTitle } : chat))
  }

  // Add message to active chat
  const addMessage = (msg) => {
    setChats(chats =>
      chats.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, msg] }
          : chat
      )
    );
  }

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh', background: 'var(--dark-bg)' }}>
        <div className="text-center text-white">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Loading FAQ Bot...</h5>
          <p className="text-muted">Initializing AI assistant</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-root">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Toggle Sidebar"
        >
          <i className={`fas fa-${sidebarOpen ? 'times' : 'bars'}`}></i>
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 bg-dark"
          style={{ opacity: 0.5, zIndex: 50 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${isMobile ? 'position-fixed' : ''} ${isMobile && sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          chats={chats}
          onNewChat={addNewChat}
          onSelectChat={handleChatSelect}
          activeChatId={activeChatId}
        />
      </div>

      {/* Chat Window */}
      <ChatWindow
        chat={chats.find(c => c.id === activeChatId)}
        updateTitle={(title) => updateTitle(activeChatId, title)}
        addMessage={addMessage}
      />

      {/* Toast notifications container */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {/* You can add toast notifications here */}
      </div>

      {/* Keyboard shortcuts help */}
      <div className="position-fixed bottom-0 start-0 p-2 text-muted" style={{ fontSize: '11px', zIndex: 10 }}>
        <div className="d-none d-lg-block">
          <span className="me-3">💡 Tips: Press Enter to send • Drag & drop files • Use quick suggestions</span>
        </div>
      </div>

      {/* Connection status indicator */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 20 }}>
        <div className="d-flex align-items-center bg-dark rounded-pill px-3 py-1 shadow">
          <div className="status-indicator status-online me-2"></div>
          <small className="text-white">Connected</small>
        </div>
      </div>
    </div>
  )
}

export default App