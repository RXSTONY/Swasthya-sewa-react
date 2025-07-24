// IntroPage.js
// Landing page for Swasthya Sewa. Shows intro, navigation, and a simple AI chatbot demo.

import React, { useState } from 'react';
import '../Intro.css';

function IntroPage() {
  // State for chatbot messages and input
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm your health assistant. Describe your symptoms, and I'll guide you." }
  ]);
  const [input, setInput] = useState('');

  // Handle sending a message in the chatbot
  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { type: 'user', text: input };
    const botMsg = { type: 'bot', text: "I'm analyzing your symptoms. Please wait..." };
    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {/* Top navigation bar */}
      <header className="top-nav">
        <a className="logo" href="/">Swasthya Sewa</a>
        <div className="nav-buttons">
          <a href="/login" className="btn-outline">Login</a>
          <a href="/signup" className="btn-filled">Sign Up</a>
        </div>
      </header>

      {/* Hero section with intro */}
      <section className="hero">
        <h1>Welcome to Swasthya Sewa</h1>
        <p>Your trusted digital healthcare partner. We connect patients with qualified doctors and protect your medical data with advanced encryption.</p>
        <button className="btn" onClick={() => window.location.href = '/login'}>Book Now</button>
      </section>

      {/* Simple AI chatbot demo */}
      <section className="chatbot">
        <h2>Health Assistant (AI Chatbot)</h2>
        <div className="chat-container">
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>{msg.text.replace(/([\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}])/gu, '')}</div>
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
