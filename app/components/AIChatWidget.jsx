import { useState, useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';

/**
 * AI Chat Widget Component
 * Floating AI assistant with c0dene0n neon theme
 * Users can ask questions about products, get recommendations, etc.
 */
export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hey! 👋 I\'m your AI shopping assistant. How can I help you find the perfect product today?',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const fetcher = useFetcher();

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle AI response from server
    useEffect(() => {
        if (fetcher.data?.response) {
            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: fetcher.data.response,
                    timestamp: new Date(),
                },
            ]);
        }
    }, [fetcher.data]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);

        // Send to AI endpoint
        fetcher.submit(
            { message: inputValue },
            { method: 'POST', action: '/api/ai/chat', encType: 'application/json' }
        );

        setInputValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="ai-chat-fab"
                    aria-label="Open AI Assistant"
                >
                    <span className="ai-chat-fab__icon">🤖</span>
                    <span className="ai-chat-fab__pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window">
                    {/* Header */}
                    <div className="ai-chat-header">
                        <div className="ai-chat-header__info">
                            <div className="ai-chat-header__avatar">🤖</div>
                            <div>
                                <h3 className="ai-chat-header__title">AI Assistant</h3>
                                <span className="ai-chat-header__status">
                                    <span className="ai-chat-status-dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="ai-chat-header__close"
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="ai-chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`ai-chat-message ai-chat-message--${msg.role}`}
                            >
                                <div className="ai-chat-message__avatar">
                                    {msg.role === 'assistant' ? '🤖' : '👤'}
                                </div>
                                <div className="ai-chat-message__content">
                                    <p>{msg.content}</p>
                                    <span className="ai-chat-message__time">
                                        {msg.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {fetcher.state === 'submitting' && (
                            <div className="ai-chat-message ai-chat-message--assistant">
                                <div className="ai-chat-message__avatar">🤖</div>
                                <div className="ai-chat-message__content">
                                    <div className="ai-chat-typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="ai-chat-input">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            className="ai-chat-input__field"
                            rows={1}
                            disabled={fetcher.state === 'submitting'}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || fetcher.state === 'submitting'}
                            className="ai-chat-input__send"
                            aria-label="Send message"
                        >
                            <span className="ai-chat-input__send-icon">🚀</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
