import { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.css";
import { sendChatMessage, clearChatHistory } from "../../services/aiService";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Nexa AI, your facilities management assistant. Ask me about alerts, sensors, equipment, or maintenance best practices.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { reply } = await sendChatMessage({
        message: text,
        sessionId: "default",
      });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = async () => {
    await clearChatHistory("default");
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. How can I help you?",
      },
    ]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 24, color: "#1976d2" }}
          >
            smart_toy
          </span>
          <h1 className={styles.title}>Nexa AI Chat</h1>
          <span className={styles.badge}>Beta</span>
        </div>
        <button className={styles.clearBtn} onClick={handleClear}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            delete
          </span>
          Clear Chat
        </button>
      </div>

      <div className={styles.messagesContainer}>
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.message} ${
                msg.role === "user" ? styles.userMsg : styles.assistantMsg
              } ${msg.isError ? styles.errorMsg : ""}`}
            >
              {msg.role === "assistant" && (
                <div className={styles.avatar}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18, color: "#fff" }}
                  >
                    smart_toy
                  </span>
                </div>
              )}
              <div className={styles.bubble}>
                <div className={styles.bubbleContent}>{msg.content}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.message} ${styles.assistantMsg}`}>
              <div className={styles.avatar}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, color: "#fff" }}
                >
                  smart_toy
                </span>
              </div>
              <div className={styles.bubble}>
                <div className={styles.typing}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about alerts, equipment, or maintenance..."
            rows={1}
            disabled={loading}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!input.trim() || loading}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              send
            </span>
          </button>
        </div>
        <div className={styles.disclaimer}>
          AI responses are generated and may not always be accurate. Verify
          critical information before acting.
        </div>
      </div>
    </div>
  );
}
