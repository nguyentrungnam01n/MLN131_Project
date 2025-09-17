import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Minimize2, Trash2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import useChatApi from "@/hooks/useChatApi"   

const quickReplies = [
  { id: "skin-analysis", text: "Phân tích da", message: "Tôi muốn được phân tích tình trạng da" },
  { id: "product-recommendations", text: "Gợi ý sản phẩm", message: "Bạn có thể gợi ý sản phẩm mỹ phẩm phù hợp với loại da của tôi không?" },
  { id: "skincare-routine", text: "Quy trình chăm sóc", message: "Tôi cần tư vấn về quy trình chăm sóc da hàng ngày phù hợp" },
  { id: "ingredient-advice", text: "Tư vấn thành phần", message: "Bạn có thể giải thích về các thành phần trong mỹ phẩm không?" },
]

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [unreadCount, setUnreadCount] = useState(1)

  const { sendMessage, isTyping } = useChatApi() // ✅ dùng hook

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  // Welcome message
  useEffect(() => {
    const welcome = {
      id: "welcome",
      content:
        "Xin chào! 👋 Tôi là Chatbot chăm sóc da. Tôi có thể giúp bạn:\n\n• Phân tích tình trạng da\n• Gợi ý sản phẩm phù hợp\n• Tư vấn routine hằng ngày\n• Giải đáp thành phần\n\nBạn cần hỗ trợ gì hôm nay? 😊",
      role: "assistant",
      timestamp: new Date(),
    }
    setMessages([welcome])
  }, [])

  useEffect(() => {
    if (isOpen) setUnreadCount(0)
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSendMessage = async (text) => {
    const content = text || inputMessage
    if (!content.trim()) return

    const userMsg = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage("")
    setShowQuickReplies(false)

    // ✅ gọi API qua hook
    const botMsg = await sendMessage(content)
    setMessages((prev) => [...prev, botMsg])

    if (!isOpen) setUnreadCount((c) => c + 1)
  }

  const handleQuickReply = (msg) => handleSendMessage(msg)

  const clearChat = () => {
    setMessages((prev) => prev.slice(0, 1)) // giữ lại welcome
    setShowQuickReplies(true)
  }

  const formatTime = (date) =>
    date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })

  return (
    <>
      {/* Bubble button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg animate-bounce"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Skincare Expert</h3>
                    <p className="text-xs opacity-80">Đang hoạt động</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" onClick={clearChat} className="text-white hover:bg-white/20 p-1 h-auto">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:bg-white/20 p-1 h-auto">
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 h-auto">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Body */}
            {!isMinimized && (
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {msg.role === "assistant" && <Bot className="w-4 h-4 mt-0.5 text-purple-500" />}
                          {msg.role === "user" && <User className="w-4 h-4 mt-0.5 text-white" />}
                          <div>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                            <p className={`text-xs mt-1 ${msg.role === "user" ? "text-white/70" : "text-gray-500"}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-purple-500" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                          <span className="text-xs text-gray-500">AI đang soạn tin...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {showQuickReplies && messages.length <= 1 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 text-center">Câu hỏi gợi ý:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickReplies.map((qr) => (
                          <Button
                            key={qr.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(qr.message)}
                            className="text-xs h-auto py-2 px-3 border-purple-200 text-purple-600 hover:bg-purple-50"
                          >
                            {qr.text}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex space-x-2 mb-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Nhập câu hỏi..."
                      className="flex-1 border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                    />
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Nhấn Enter để gửi • Có thể gửi ảnh • AI có thể mắc lỗi</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
