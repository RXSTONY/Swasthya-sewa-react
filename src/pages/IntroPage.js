// IntroPage.js

import React, { useState } from 'react';
import '../Intro.css';

function IntroPage() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm your health assistant. Describe your symptoms, and I'll guide you." }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMsg = { type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
  
    console.log("Sending message to backend:", input); // ✅ Add this
  
    try {
      const response = await fetch('http://127.0.0.1:5000/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
  
      const data = await response.json();
      const botMsg = { type: 'bot', text: data.response };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { type: 'bot', text: "Sorry, I couldn't connect." }]);
    }
  
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
        <p>Your trusted digital healthcare partner.</p>
        <button className="btn" onClick={() => window.location.href = '/login'}>Book Now</button>
      </section>

      <section className="chatbot">
        <h2>chatbot, please free to ask anything about our service😊</h2>
        <div className="chat-container">
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                {msg.text.replace(
                  /([\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}])/gu,
                  ''
                )}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your symptoms..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default IntroPage;
