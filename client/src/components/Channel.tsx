"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Phone, Video, MoreVertical, Send, Plus, Hash, Volume2, Bell, Pin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { MessageInput } from "./message-input"

type User = {
  id: number
  name: string
  avatar: string
  online: boolean
  role?: "admin" | "moderator" | "member"
}

type Message = {
  id: number
  userId: number
  text: string
  timestamp: string
  pinned?: boolean
  reactions?: { emoji: string; count: number }[]
}

type Channel = {
  id: string
  name: string
  unreadCount?: number
  isVoice?: boolean
}

const USERS: User[] = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", online: true, role: "admin" },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40", online: true, role: "moderator" },
  { id: 3, name: "Mike Johnson", avatar: "/placeholder.svg?height=40&width=40", online: false, role: "member" },
  { id: 4, name: "Sarah Williams", avatar: "/placeholder.svg?height=40&width=40", online: true, role: "member" },
  { id: 5, name: "Alex Brown", avatar: "/placeholder.svg?height=40&width=40", online: false, role: "member" },
]

const MESSAGES: Message[] = [
  {
    id: 1,
    userId: 2,
    text: "Hey everyone! How are you doing today?",
    timestamp: "10:30 AM",
    reactions: [{ emoji: "👍", count: 3 }],
  },
  { id: 2, userId: 1, text: "I'm doing great, thanks for asking!", timestamp: "10:32 AM" },
  { id: 3, userId: 4, text: "Just finished the project we were working on.", timestamp: "10:35 AM", pinned: true },
  { id: 4, userId: 2, text: "That's awesome! Can you share the details?", timestamp: "10:36 AM" },
  { id: 5, userId: 4, text: "Sure, I'll send you the documentation later today.", timestamp: "10:38 AM" },
  {
    id: 6,
    userId: 1,
    text: "I'd like to see that too if possible.",
    timestamp: "10:40 AM",
    reactions: [{ emoji: "❤️", count: 2 }],
  },
]

const CHANNELS: Channel[] = [
  { id: "general", name: "general", unreadCount: 0 },
  { id: "random", name: "random", unreadCount: 3 },
  { id: "development", name: "development", unreadCount: 0 },
  { id: "design", name: "design", unreadCount: 5 },
  { id: "voice-chat", name: "voice-chat", isVoice: true },
]

export default function ChannelPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(MESSAGES)
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0])
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // const [messages, setMessages] = useState<{ id: string; content: string; attachments?: string[] }[]>([])

  // const handleSendMessage = (content: string, attachments?: string[]) => {
  //   setMessages([
  //     ...messages,
  //     {
  //       id: Date.now().toString(),
  //       content,
  //       attachments,
  //     },
  //   ])
  // }
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        userId: 1, // Current user
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleAddReaction = (messageId: number, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === emoji)
          return {
            ...msg,
            reactions: existingReaction
              ? msg.reactions?.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r))
              : [...(msg.reactions || []), { emoji, count: 1 }],
          }
        }
        return msg
      }),
    )
  }

  const filteredUsers = USERS.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  

  return (
    <div className="flex h-screen bg-zinc-100">
      {/* Left sidebar - Channels (20% width) */}
      <div className="w-1/5 bg-zinc-800 text-zinc-200 flex flex-col">
        <div className="p-5 border-b border-zinc-700">
          <h1 className="text-xl font-bold">Workspace</h1>
        </div>

        <div className="p-4 border-b border-zinc-700">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold uppercase text-zinc-400">Channels</h2>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white">
              <Plus size={16} />
            </Button>
          </div>
          <ScrollArea className="h-40">
            {CHANNELS.filter((c) => !c.isVoice).map((channel) => (
              <div
                key={channel.id}
                onClick={() => setActiveChannel(channel)}
                className={`flex items-center p-2 rounded-md cursor-pointer ${activeChannel.id === channel.id ? "bg-zinc-700" : "hover:bg-zinc-700"}`}
              >
                <Hash size={16} className="mr-2 text-zinc-400" />
                <span>{channel.name}</span>
                {channel.unreadCount ? (
                  <Badge className="ml-auto bg-blue-500 hover:bg-blue-500">{channel.unreadCount}</Badge>
                ) : null}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* <div className="p-4 border-b border-zinc-700">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold uppercase text-zinc-400">Voice Channels</h2>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white">
              <Plus size={16} />
            </Button>
          </div>
          {CHANNELS.filter((c) => c.isVoice).map((channel) => (
            <div
              key={channel.id}
              onClick={() => setActiveChannel(channel)}
              className={`flex items-center p-2 rounded-md cursor-pointer ${activeChannel.id === channel.id ? "bg-zinc-700" : "hover:bg-zinc-700"}`}
            >
              <Volume2 size={16} className="mr-2 text-zinc-400" />
              <span>{channel.name}</span>
            </div>
          ))}
        </div> */}

        <div className="p-4 border-b border-zinc-700 flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold uppercase text-zinc-400">Online Members</h2>
            <div className="relative">
              <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members"
                className="pl-8 h-8 bg-zinc-700 border-zinc-600 text-sm"
              />
            </div>
          </div>
          <div className="h-53 mb-0 w-full overflow-hidden">
          <ScrollArea className="h-full">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center p-2 rounded-md hover:bg-zinc-700 cursor-pointer">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-zinc-800 rounded-full"></span>
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-sm">{user.name}</p>
                  {user.role && <p className="text-xs text-zinc-400 capitalize">{user.role}</p>}
                </div>
              </div>
            ))}
          </ScrollArea>
          </div>   
        </div>

        {/* Current user profile */}
        <div className="p-3 bg-zinc-900 flex items-center mt-auto">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-sm">You</p>
            <p className="text-xs text-zinc-400">Online</p>
          </div>
        </div>
      </div>

      {/* Right side - Chat area (80% width) */}
      <div className="w-4/5 flex flex-col ">
        {/* Channel header */}
        <div className="flex items-center justify-between p-4 border-b bg-zinc-200 border-zinc-300">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600">
              {activeChannel.isVoice ? <Volume2 size={16} /> : <Hash size={16} />}
            </div>
            <div className="ml-3">
              <h2 className="font-semibold">{activeChannel.name}</h2>
              <p className="text-xs text-zinc-500">
                {activeChannel.isVoice ? "Voice channel" : `${USERS.filter((u) => u.online).length} members online`}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pin size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pinned Messages</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notification Settings</TooltipContent>
            </Tooltip>
            {activeChannel.isVoice ? (
              <>
                <Button className="h-8 px-4">
                  <Phone size={16} className="mr-2" />
                  Join Voice
                </Button>
              </>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start Voice Call</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start Video Call</TooltipContent>
                </Tooltip>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Channel Settings</DropdownMenuItem>
                <DropdownMenuItem>Invite People</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Leave Channel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-hidden bg-zinc-100">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4">
              {messages.map((msg) => {
                const user = USERS.find((u) => u.id === msg.userId)
                const isCurrentUser = msg.userId === 1

                return (
                  <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-start max-w-[70%]`}>
                      {!isCurrentUser && (
                        <Avatar className="mt-1 mr-2 h-8 w-8">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        {!isCurrentUser && (
                          <p className="text-xs text-zinc-500 mb-1">
                            {user?.name}
                            {user?.role === "admin" && (
                              <span className="ml-1 px-1 py-0.5 text-xs bg-red-100 text-red-800 rounded">Admin</span>
                            )}
                            {user?.role === "moderator" && (
                              <span className="ml-1 px-1 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Mod</span>
                            )}
                          </p>
                        )}
                        <div
                          className={`p-3 rounded-lg ${isCurrentUser ? "bg-primary text-white" : "bg-white border border-zinc-200"}`}
                        >
                          <p>{msg.text}</p>
                          {msg.pinned && (
                            <div className="flex items-center mt-2 text-xs text-zinc-400">
                              <Pin size={12} className="mr-1" />
                              Pinned
                            </div>
                          )}
                        </div>
                        <div className="flex items-center mt-1 space-x-1">
                          {msg.reactions?.map((reaction) => (
                            <button
                              key={reaction.emoji}
                              onClick={() => handleAddReaction(msg.id, reaction.emoji)}
                              className="text-xs bg-zinc-100 hover:bg-zinc-200 rounded-full px-2 py-0.5 flex items-center"
                            >
                              {reaction.emoji} {reaction.count}
                            </button>
                          ))}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="text-xs text-zinc-400 hover:text-zinc-600">Add Reaction</button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="grid grid-cols-6 gap-1 w-48">
                              {["👍", "❤️", "😂", "😮", "😢", "🎉"].map((emoji) => (
                                <DropdownMenuItem
                                  key={emoji}
                                  onClick={() => handleAddReaction(msg.id, emoji)}
                                  className="p-1 text-lg"
                                >
                                  {emoji}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className={`text-xs text-zinc-500 mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Message input */}
          <div className="p-4 border-t border-zinc-200 bg-white">
            {/* <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message #${activeChannel.name}`}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send size={20} />
              </Button>
            </form> */}
            <MessageInput onSendMessage={handleSendMessage}/>
          </div>
      </div>
    </div>
  )
}

