import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your recipe assistant. I can help you find recipes, suggest substitutions, answer cooking questions, and provide nutritional advice. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Here are some recipe suggestions based on what you're looking for...",
        "For a healthier alternative, you could substitute Greek yogurt for sour cream. It has more protein and fewer calories!",
        "Here's a quick tip: Always preheat your oven for at least 15 minutes before baking for best results.",
        "Based on your preferences, I'd recommend trying a Mediterranean-style meal with grilled chicken, quinoa, and roasted vegetables.",
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h2>Recipe AI Assistant</h2>
        <p className="text-sm text-gray-600 mt-1">Ask me anything about recipes, cooking, or nutrition</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={message.role === "user" ? "bg-rose-100" : "bg-blue-100"}>
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-rose-600" />
                  ) : (
                    <Bot className="h-4 w-4 text-blue-600" />
                  )}
                </AvatarFallback>
              </Avatar>
              
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about recipes, ingredients, or cooking tips..."
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
