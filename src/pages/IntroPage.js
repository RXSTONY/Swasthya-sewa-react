
import React, { useState } from 'react';
import '../Intro.css';

function IntroPage() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm your health assistant. Describe your symptoms, and I'll guide you." }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { type: 'user', text: input };
    const botMsg = { type: 'bot', text: "I'm analyzing your symptoms. Please wait..." };
    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      <header className="top-nav">
        <a className="logo" href="/">Swasthya Sewa</a>
        <div className="nav-buttons">
          <a href="/login" className="btn-outline">Login</a>
          <a href="/signup" className="btn-filled">Sign Up</a>
        </div>
      </header>

      <section className="hero">
        <h1>Welcome to Swasthya Sewa</h1>
        <p>Your trusted digital healthcare partner. We connect patients with qualified doctors and protect your medical data with advanced encryption.</p>
        <button className="btn" onClick={() => window.location.href = '/login'}>Book Now</button>
      </section>

      <section className="chatbot">
        <h2>Health Assistant (AI Chatbot)</h2>
        <div className="chat-container">
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your symptoms..." />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default IntroPage;
