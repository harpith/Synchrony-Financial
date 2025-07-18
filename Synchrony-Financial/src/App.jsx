import React, { useState } from "react"
import Sidebar from "./Sidebar"
import ChatWindow from "./ChatWindow"
import "./index.css" 

const App = () => {
  const [chats, setChats] = useState([
    { id: 1, title: "Welcome Chat", messages: [] }
  ])
  const [activeChatId, setActiveChatId] = useState(1)

  const addNewChat = () => {
    const newId = Date.now()
    const newChat = { id: newId, title: "New Chat", messages: [] }
    setChats([newChat, ...chats])
    setActiveChatId(newId)
  }

  const updateTitle = (id, newTitle) => {
    setChats(chats.map(chat => chat.id === id ? { ...chat, title: newTitle } : chat))
  }

  // Add message to active chat
  const addMessage = (msg) => {
    setChats(chats.map(chat =>
      chat.id === activeChatId
        ? { ...chat, messages: [...chat.messages, msg] }
        : chat
    ))
  }

  return (
    <div className="app-root">
      <Sidebar
        chats={chats}
        onNewChat={addNewChat}
        onSelectChat={setActiveChatId}
        activeChatId={activeChatId}
      />
      <ChatWindow
        chat={chats.find(c => c.id === activeChatId)}
        updateTitle={(title) => updateTitle(activeChatId, title)}
        addMessage={addMessage}
      />
    </div>
  )
}

export default App