
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  content: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi! How can I help you?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { content: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        content: getBotResponse(input),
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInput("");
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes("interview")) {
      return "Click 'Take Interview' on your dashboard.";
    } else if (input.includes("price") || input.includes("cost")) {
      return "We offer a free trial with 3 mock interviews.";
    } else if (input.includes("help")) {
      return "I can help with interview process, pricing, and support.";
    }
    return "Ask me about interviews or pricing!";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[500px] rounded-t-xl">
          <DrawerHeader className="p-3">
            <DrawerTitle className="text-sm">InterviewAce Assistant</DrawerTitle>
          </DrawerHeader>
          <div className="px-3 pb-3 flex flex-col h-full">
            <div className="flex-grow overflow-y-auto mb-2 space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-1 text-sm ${
                      message.isBot
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow text-sm h-10"
              />
              <Button type="submit" size="icon" className="shrink-0 h-10 w-10">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChatBot;
