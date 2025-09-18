import { useState } from "react"

export default function useChatApi() {
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (message) => {
    try {
      setIsTyping(true);
      
      const response = await fetch("https://seo-flask-api.azurewebsites.net/ask_gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
        }),
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now().toString(),
        content: data.answer,
        role: "assistant",
        timestamp: new Date(),
      };

      setIsTyping(false);
      return botMessage;

    } catch (error) {
      console.error("Error fetching data:", error);
      setIsTyping(false);
      return {
        id: Date.now().toString(),
        content: "Đã có lỗi xảy ra, vui lòng thử lại!",
        role: "assistant",
        timestamp: new Date(),
      };
    }
  };

  return { sendMessage, isTyping };
}