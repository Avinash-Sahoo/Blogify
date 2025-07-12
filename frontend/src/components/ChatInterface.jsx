import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './stylesheet/ChatInterface.css';
import { Plus, SendHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ChatInterface = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // const refresh = ()=>{
  //   window.location.reload(true); 
  // }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions" , {
        method: 'POST',
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages
              .filter((msg) => msg.sender === 'user')
              .map((m) => ({ role: 'user', content: m.text })),
            { role: 'user', content: input },
          ],
        }),
      });

      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "Sorry, something went wrong.";
      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: '⚠️ Error: Could not fetch response.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`chat-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="fw-3 d-flex justify-content-between align-items-center py-3 px-5 border-bottom">
        <h5 className="m-0">Blogify AI</h5>
        <div>
         <button className="new_chat btn btn-sm btn-outline-secondary mx-3 " onClick={()=>navigate("/aichat")}>
          New Chat
          </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        </div>
      </div>

      <div className="chat-box px-4 py-5 overflow-auto flex-grow-1">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble ai typing">
            <span className="dot"></span><span className="dot"></span><span className="dot"></span>
          </div>
        )}
        <div ref={chatRef}></div>
      </div>

      <div className="chat-input p-3 border-top d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
