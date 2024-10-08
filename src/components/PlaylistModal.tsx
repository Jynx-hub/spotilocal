import React, { useState } from 'react'
import { X } from 'lucide-react'

interface PlaylistModalProps {
  createPlaylist: (name: string) => void
  closeModal: () => void
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({ createPlaylist, closeModal }) => {
  const [playlistName, setPlaylistName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playlistName.trim()) {
      createPlaylist(playlistName.trim())
      closeModal()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Playlist</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name"
            className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  )
}

export default PlaylistModal