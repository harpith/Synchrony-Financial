// import React, { useRef, useState } from "react";

// const ChatWindow = ({ chat, addMessage }) => {
//   const fileInputRef = useRef();
//   const [input, setInput] = useState("");

//   const handleFileClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       addMessage({
//         type: "file",
//         name: file.name,
//         size: file.size,
//         time: new Date().toLocaleTimeString(),
//       });
//     }
//   };

//   const handleSend = () => {
//     if (input.trim()) {
//       addMessage({
//         type: "text",
//         text: input,
//         time: new Date().toLocaleTimeString(),
//       });
//       setInput("");
//       // Here you can call GPT API and add its response as a message
//     }
//   };

//   return (
//     <div className="chat-window-custom d-flex flex-column">
//       {/* Chat header */}
//       <div className="bg-secondary text-white px-4 py-3 rounded-top d-flex align-items-center justify-content-between shadow-sm">
//         <h5 className="mb-0">{chat?.title || "Chat"}</h5>
//         <span className="badge bg-dark text-white">FAQ CHATBOT</span>
//       </div>

//       {/* Chat messages area */}
//       <div className="flex-grow-1 overflow-auto px-4 py-3 bg-dark" style={{ minHeight: 0 }}>
//         <div className="d-flex flex-column gap-3">
//           <div className="align-self-start">
//             <div className="bg-secondary text-white rounded-pill shadow-sm px-3 py-2">
//               <strong>FAQ:</strong> Welcome! Upload a file or ask a question.
//             </div>
//           </div>
//           {chat?.messages?.map((msg, idx) =>
//             msg.type === "text" ? (
//               <div key={idx} className="align-self-end">
//                 <div className="bg-primary text-white rounded-pill shadow-sm px-3 py-2">
//                   <span>{msg.text}</span>
//                   <span className="ms-2 small text-light">{msg.time}</span>
//                 </div>
//               </div>
//             ) : (
//               <div key={idx} className="align-self-end">
//                 <div className="bg-info text-dark rounded-pill shadow-sm px-3 py-2">
//                   <i className="fas fa-file-alt me-2"></i>
//                   <span>{msg.name} ({Math.round(msg.size/1024)} KB)</span>
//                   <span className="ms-2 small text-dark">{msg.time}</span>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       {/* Chat input area */}
//       <div className="bg-black px-3 py-3 border-top d-flex align-items-center gap-2">
//         {/* File upload icon */}
//         <span
//           className="input-group-text bg-dark border-0 text-white"
//           style={{ cursor: "pointer" }}
//           onClick={handleFileClick}
//           title="Upload Document"
//         >
//           <i className="fas fa-paperclip"></i>
//         </span>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           accept=".pdf,.doc,.docx,.txt"
//           style={{ display: "none" }}
//         />

//         {/* Text input */}
//         <input
//           type="text"
//           className="form-control rounded-pill bg-dark text-white border-secondary"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={e => e.key === "Enter" && handleSend()}
//         />

//         {/* Send button */}
//         <button className="btn btn-secondary rounded-pill px-4 text-white" onClick={handleSend}>
//           <i className="fas fa-paper-plane me-2"></i>Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;


import React, { useRef, useState, useEffect } from "react";

const ChatWindow = ({ chat, addMessage }) => {
  const fileInputRef = useRef();
  const messagesEndRef = useRef();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // Bot response logic
  const getBotResponse = (question) => {
    const q = question.toLowerCase();
    if (q.includes("api")) {
      return "🔐 To authenticate with our API, use JWT tokens in the Authorization header as 'Bearer {token}'.";
    } else if (q.includes("deploy")) {
      return "🚀 Deployment uses Docker containers on AWS ECS. Each service has a Dockerfile.";
    } else if (q.includes("test")) {
      return "🧪 For testing, use Jest and React Testing Library for frontend, and Mocha for backend.";
    }
    return "🤖 I'm here to help! Please ask a technical question or upload a document.";
  };

  // // Call GPT API (hardcoded dummy)
  // const callGptApi = async (userMessage) => {
  //   // Simulate bot reply with hardcoded logic
  //   const q = userMessage.toLowerCase();
  //   if (q.includes("api")) {
  //     return "🔐 To authenticate with our API, use JWT tokens in the Authorization header as 'Bearer {token}'.";
  //   } else if (q.includes("deploy")) {
  //     return "🚀 Deployment uses Docker containers on AWS ECS. Each service has a Dockerfile.";
  //   } else if (q.includes("test")) {
  //     return "🧪 For testing, use Jest and React Testing Library for frontend, and Mocha for backend.";
  //   }
  //   return "🤖 I'm here to help! Please ask a technical question or upload a document.";
  // };

  const callGptApi = async (userMessage) => {
    const q = userMessage.toLowerCase();

    if (q.includes("confidential information")) {
      return "🔒 Confidential Information includes trade secrets, software, designs, methods, strategies, and any sensitive company data, and must not be disclosed during or after the internship.";
    } else if (q.includes("duration") || q.includes("term of agreement")) {
      return "📅 The agreement lasts through the internship and continues for 12 months after termination.";
    } else if (q.includes("intellectual property")) {
      return "💡 Any intellectual property or invention made during your internship related to company business belongs to Navatej Technologies.";
    } else if (q.includes("non-solicitation")) {
      return "🚫 During your internship, you are not allowed to solicit customers or employees of Navatej Technologies.";
    } else if (q.includes("governing law") || q.includes("jurisdiction")) {
      return "⚖️ This agreement is governed by Indian law and legal matters are to be resolved in the courts of Hyderabad.";
    } else if (q.includes("notice period")) {
      return "📨 Both you and the employer must give a 15-day written notice before ending the internship.";
    } else if (q.includes("modifications")) {
      return "📝 Any modifications to this agreement must be in writing and mutually agreed upon.";
    } else if (q.includes("assignment of agreement")) {
      return "🔁 You cannot assign this agreement to someone else. However, Navatej Technologies may assign it.";
    } else if (q.includes("publication")) {
      return "📰 You must get written consent from Navatej before publishing anything related to your internship work.";
    }

    return "🤖 I'm here to help! Please ask a question related to the internship agreement.";
  };

  // Handle sending a message
  const handleSend = async () => {
    if (input.trim()) {
      addMessage({
        type: "text",
        text: input,
        time: new Date().toLocaleTimeString(),
      });
      setIsTyping(true);
      setInput("");
      // Call GPT API and add bot reply
      const botReply = await callGptApi(input);
      addMessage({
        type: "bot",
        text: botReply,
        time: new Date().toLocaleTimeString(),
      });
      setIsTyping(false);
    }
  };

  // Handle file upload
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
      setIsTyping(true);
      setTimeout(() => {
        addMessage({
          type: "bot",
          text: `📄 File "${file.name}" uploaded successfully! Let me know if you have questions about it.`,
          time: new Date().toLocaleTimeString(),
        });
        setIsTyping(false);
      }, 1200);
    }
  };

  return (
    <div className="chat-window-custom d-flex flex-column">
      {/* Header */}
      <div className="bg-secondary text-white px-4 py-3 rounded-top d-flex align-items-center justify-content-between shadow-sm">
        <h5 className="mb-0">{chat?.title || "Chat"}</h5>
        <span className="badge bg-dark text-white">FAQ CHATBOT</span>
      </div>

      {/* Messages */}
      <div className="flex-grow-1 overflow-auto px-4 py-3 bg-dark" style={{ minHeight: 0 }}>
        <div className="d-flex flex-column gap-3">
          {chat?.messages?.map((msg, idx) => {
            if (msg.type === "text") {
              return (
                <div key={idx} className="align-self-end">
                  <div className="bg-primary text-white rounded-pill shadow-sm px-3 py-2">
                    <span>{msg.text}</span>
                    <span className="ms-2 small text-light">{msg.time}</span>
                  </div>
                </div>
              );
            }
            if (msg.type === "file") {
              return (
                <div key={idx} className="align-self-end">
                  <div className="bg-info text-dark rounded-pill shadow-sm px-3 py-2">
                    <i className="fas fa-file-alt me-2"></i>
                    <span>{msg.name} ({Math.round(msg.size / 1024)} KB)</span>
                    <span className="ms-2 small text-dark">{msg.time}</span>
                  </div>
                </div>
              );
            }
            // Bot message
            return (
              <div key={idx} className="align-self-start">
                <div className="bg-secondary text-white rounded-pill shadow-sm px-3 py-2">
                  <strong>FAQ:</strong> {msg.text}
                  <span className="ms-2 small text-light">{msg.time}</span>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="align-self-start">
              <div className="bg-secondary text-white rounded-pill shadow-sm px-3 py-2 message-loading">
                <span>FAQ is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-black px-3 py-3 border-top d-flex align-items-center gap-2">
        <span
          className="input-group-text bg-dark border-0 text-white"
          style={{ cursor: "pointer" }}
          onClick={handleFileClick}
          title="Upload Document"
        >
          <i className="fas fa-paperclip text-white"></i>
        </span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: "none" }}
        />
        <input
          type="text"
          className="form-control rounded-pill bg-dark text-white border-secondary"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-secondary rounded-pill px-4 text-white" onClick={handleSend}>
          <i className="fas fa-paper-plane me-2"></i>Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;