import { useState } from "react"

export default function useChatApi() {
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (content) => {
    setIsTyping(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = {
          id: Date.now().toString(),
          content: `🤖 Đây là phản hồi demo cho: "${content}"\n\n(Bạn có thể thay bằng API response)`,
          role: "assistant",
          timestamp: new Date(),
        }
        setIsTyping(false)
        resolve(response)
      }, 1500)
    })
  }

  return { sendMessage, isTyping }
}
