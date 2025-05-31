"use client"

import * as React from "react"
import { ArrowLeft, Camera, Paperclip, Send, Smile } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample chat data
const chatData = {
  trainer: {
    id: 1,
    name: "田中 健太",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
    lastSeen: "オンライン",
  },
  messages: [
    {
      id: 1,
      senderId: 1,
      senderName: "田中 健太",
      content: "こんにちは！お疲れ様です。今日のトレーニングはいかがでしたか？",
      timestamp: "14:30",
      type: "text",
      isOwn: false,
    },
    {
      id: 2,
      senderId: 2,
      senderName: "あなた",
      content: "お疲れ様です！今日は筋トレを頑張りました💪",
      timestamp: "14:32",
      type: "text",
      isOwn: true,
    },
    {
      id: 3,
      senderId: 1,
      senderName: "田中 健太",
      content: "素晴らしいですね！どの部位を重点的にトレーニングしましたか？",
      timestamp: "14:33",
      type: "text",
      isOwn: false,
    },
    {
      id: 4,
      senderId: 2,
      senderName: "あなた",
      content: "胸と腕を中心にやりました。ベンチプレスで新記録が出ました！",
      timestamp: "14:35",
      type: "text",
      isOwn: true,
    },
    {
      id: 5,
      senderId: 2,
      senderName: "あなた",
      content: "/placeholder.svg?height=200&width=300",
      timestamp: "14:36",
      type: "image",
      isOwn: true,
    },
    {
      id: 6,
      senderId: 1,
      senderName: "田中 健太",
      content: "おめでとうございます！🎉 フォームもとても良いですね。次回はさらに重量を上げてみましょう！",
      timestamp: "14:38",
      type: "text",
      isOwn: false,
    },
    {
      id: 7,
      senderId: 2,
      senderName: "あなた",
      content: "ありがとうございます！次回のセッションが楽しみです",
      timestamp: "14:40",
      type: "text",
      isOwn: true,
    },
    {
      id: 8,
      senderId: 1,
      senderName: "田中 健太",
      content: "明日の19時からのセッションでお待ちしています。今日はゆっくり休んでくださいね！",
      timestamp: "14:42",
      type: "text",
      isOwn: false,
    },
  ],
}

export default function ChatPage() {
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState(chatData.messages)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Auto scroll to bottom when new messages are added
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 2,
        senderName: "あなた",
        content: message,
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        type: "text" as const,
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file and get a URL
      const imageUrl = URL.createObjectURL(file)
      const newMessage = {
        id: messages.length + 1,
        senderId: 2,
        senderName: "あなた",
        content: imageUrl,
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        type: "image" as const,
        isOwn: true,
      }
      setMessages([...messages, newMessage])
    }
  }

  const MessageBubble = ({ message }: { message: (typeof messages)[0] }) => {
    const isOwn = message.isOwn

    return (
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`flex items-end gap-2 max-w-[70%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
          {!isOwn && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={chatData.trainer.avatar || "/placeholder.svg"} alt={chatData.trainer.name} />
              <AvatarFallback>{chatData.trainer.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}

          <div
            className={`relative px-4 py-2 rounded-2xl ${
              isOwn
                ? "bg-blue-600 text-white rounded-br-md"
                : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
            }`}
          >
            {message.type === "text" ? (
              <p className="text-sm leading-relaxed">{message.content}</p>
            ) : (
              <div className="relative">
                <Image
                  src={message.content || "/placeholder.svg"}
                  alt="Shared image"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
            <div className={`text-xs mt-1 ${isOwn ? "text-blue-100" : "text-gray-500"}`}>{message.timestamp}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/trainer/1">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <Avatar className="h-10 w-10">
            <AvatarImage src={chatData.trainer.avatar || "/placeholder.svg"} alt={chatData.trainer.name} />
            <AvatarFallback>{chatData.trainer.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{chatData.trainer.name}</h2>
            <p className="text-sm text-gray-500">
              {chatData.trainer.isOnline ? (
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  {chatData.trainer.lastSeen}
                </span>
              ) : (
                chatData.trainer.lastSeen
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-4">
        <div className="space-y-1">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Camera Button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="h-5 w-5" />
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力..."
              className="pr-12 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />

            {/* Emoji Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>

        {/* Hidden File Input */}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </div>
    </div>
  )
}
