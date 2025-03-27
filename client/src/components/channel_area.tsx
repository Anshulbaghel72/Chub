"use client"

import { motion } from "framer-motion"
import { MoreVertical, X } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

interface Channel {
  id: number
  name: string
  purpose: string
  image: string
}

const ChannelCreator = () => {
  const [isAdmin, setIsAdmin] = useState(true)
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 1,
      name: "General",
      purpose: "General discussions and announcements",
      image: "https://i.pinimg.com/736x/92/65/e2/9265e224c02a8b755a328eb73fc40938.jpg",
    },
    {
      id: 2,
      name: "Development",
      purpose: "Discuss development-related topics",
      image: "https://i.pinimg.com/736x/fa/10/16/fa10164a25a4cfe6a3d0ef7cd22a7025.jpg",
    },
    {
      id: 3,
      name: "Design",
      purpose: "Share and discuss design ideas",
      image: "https://i.pinimg.com/736x/92/d9/91/92d9911a8f9f60ffc96028e50ddb6e62.jpg",
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [channelName, setChannelName] = useState("")
  const [channelPurpose, setChannelPurpose] = useState("")
  const [channelImage, setChannelImage] = useState("")

  // Function to handle form submission
  const handleAddChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (channelName && channelPurpose) {
      const newChannel = {
        id: Date.now(), // Unique ID for each channel
        name: channelName,
        purpose: channelPurpose,
        image: channelImage || "https://via.placeholder.com/100", // Default image if none provided
      }

      setChannels([...channels, newChannel]) // Add new channel to the list
      setChannelName("") // Reset form fields
      setChannelPurpose("")
      setChannelImage("")
      setShowForm(false) // Hide the form after submission
    }
  }

  // Function to delete a channel
  const handleDeleteChannel = (id: number) => {
    setChannels(channels.filter((channel) => channel.id !== id))
  }

  return (
    <div className="px-4 py-10 md:px-6 lg:px-8">
      {/* Dotted Border Box with Plus Icon */}
      {isAdmin && (
        <div
          className="w-full max-w-xs mx-auto h-60 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-900 transition-colors"
          onClick={() => setShowForm(true)}
        >
          <span className="text-[4rem] text-gray-400">+</span>
        </div>
      )}

      {/* Form to Add New Channel */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          {/* Animated Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-2xl w-[90%] max-w-md relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Add New Channel</h2>
            <form onSubmit={handleAddChannel} className="space-y-4">
              {/* Channel Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Channel Name</label>
                <Input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* Channel Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Channel Purpose</label>
                <Input
                  type="text"
                  value={channelPurpose}
                  onChange={(e) => setChannelPurpose(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* Channel Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Channel Image URL</label>
                <Input
                  type="text"
                  value={channelImage}
                  onChange={(e) => setChannelImage(e.target.value)}
                  className="w-full"
                  placeholder="Optional"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <Button type="button" onClick={() => setShowForm(false)} variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Add Channel</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Display Created Channels */}
      <div className="flex flex-wrap justify-center gap-5 mt-10">
        {channels.map((channel) => (
          <Link to={`/channel`} key={channel.id} className="w-full max-w-xs">
            <div className="h-60 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl" />
              <div className="w-full h-full absolute inset-0">
                <img
                  src={channel.image || "/placeholder.svg"}
                  alt={channel.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-lg font-bold">{channel.name}</h3>
                <p className="text-sm opacity-80">{channel.purpose}</p>
              </div>

              {isAdmin && (
                <div className="absolute top-3 right-3 z-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-gray-200 hover:bg-zinc-300 text-gray-700"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e: { preventDefault: () => void }) => {
                          e.preventDefault()
                          handleDeleteChannel(channel.id)
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e: { preventDefault: () => void }) => {
                          e.preventDefault()
                          alert("Edit functionality not implemented yet")
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e: { preventDefault: () => void }) => {
                          e.preventDefault()
                          alert(`About: ${channel.name}`)
                        }}
                      >
                        About
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ChannelCreator

