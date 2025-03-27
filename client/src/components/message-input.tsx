"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Send, Paperclip, Smile, X, ImageIcon, Mic, Camera } from "lucide-react"

const EMOJI_CATEGORIES = [
  { name: "Smileys", emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"] },
  { name: "Gestures", emojis: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤙", "🤛", "🤜", "👏"] },
  { name: "Hearts", emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔"] },
]

interface MessageInputProps {
  onSendMessage: (message: string, attachments?: string[]) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generate preview URLs for selected files
  useEffect(() => {
    const newPreviewUrls = files.map((file) => {
      if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file)
      }
      return "/placeholder.svg?height=100&width=100"
    })

    setPreviewUrls(newPreviewUrls)

    // Cleanup function to revoke object URLs
    return () => {
      newPreviewUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [files])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (message.trim() || previewUrls.length > 0) {
      onSendMessage(message, previewUrls)
      setMessage("")
      setFiles([])
      setPreviewUrls([])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Here you would implement actual voice recording logic
  }

  return (
    <div className="border-t border-zinc-200 bg-white p-2 sm:p-4">
      {/* File previews */}
      {previewUrls.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 p-2 bg-zinc-50 rounded-md">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url || "/placeholder.svg"}
                alt={`Preview ${index}`}
                className="h-16 w-16 object-cover rounded border border-zinc-200"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        {/* Mobile action buttons (visible on small screens) */}
        <div className="flex md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-zinc-500 hover:text-zinc-900"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip size={20} />
          </Button>
        </div>

        <div className="relative flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="pr-24 py-6 rounded-full"
          />

          {/* Desktop action buttons (hidden on mobile) */}
          <div className="absolute right-3 bottom-2.5 hidden md:flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500 hover:text-zinc-900"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={18} />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500 hover:text-zinc-900"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={18} />
            </Button>

            <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900">
                  <Smile size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <div className="space-y-2">
                  {EMOJI_CATEGORIES.map((category) => (
                    <div key={category.name}>
                      <h3 className="text-xs font-medium text-zinc-500 mb-1">{category.name}</h3>
                      <div className="grid grid-cols-8 gap-1">
                        {category.emojis.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              addEmoji(emoji)
                              setIsEmojiPickerOpen(false)
                            }}
                            className="text-xl hover:bg-zinc-100 rounded p-1"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${isRecording ? "text-red-500" : "text-zinc-500 hover:text-zinc-900"}`}
              onClick={toggleRecording}
            >
              <Mic size={18} />
            </Button>
          </div>
        </div>

        <Button type="submit" size="icon" className="rounded-full h-10 w-10 flex-shrink-0">
          <Send size={18} />
        </Button>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept="image/*,video/*,audio/*"
        />
      </form>

      {/* Mobile emoji and attachment options (visible when input is focused) */}
      <div className="flex justify-between mt-2 md:hidden">
        <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="text-zinc-500">
              <Smile size={18} className="mr-1" />
              <span className="text-xs">Emoji</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="space-y-2">
              {EMOJI_CATEGORIES.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xs font-medium text-zinc-500 mb-1">{category.name}</h3>
                  <div className="grid grid-cols-8 gap-1">
                    {category.emojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          addEmoji(emoji)
                          setIsEmojiPickerOpen(false)
                        }}
                        className="text-xl hover:bg-zinc-100 rounded p-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-zinc-500"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon size={18} className="mr-1" />
          <span className="text-xs">Gallery</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-zinc-500"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera size={18} className="mr-1" />
          <span className="text-xs">Camera</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`${isRecording ? "text-red-500" : "text-zinc-500"}`}
          onClick={toggleRecording}
        >
          <Mic size={18} className="mr-1" />
          <span className="text-xs">{isRecording ? "Stop" : "Voice"}</span>
        </Button>
      </div>
    </div>
  )
}

