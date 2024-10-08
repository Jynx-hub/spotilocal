import React from 'react'
import { X } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  youtubeUrl: string
  coverImage: string
}

interface PlayerProps {
  song: Song
}

const Player: React.FC<PlayerProps> = ({ song }) => {
  const videoId = new URL(song.youtubeUrl).searchParams.get('v')

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={song.coverImage} alt={song.title} className="w-12 h-12 rounded-md mr-4" />
          <div>
            <h3 className="font-medium">{song.title}</h3>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </div>
        </div>
        <div className="flex-1 mx-4">
          <iframe
            width="100%"
            height="60"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <button className="text-gray-400 hover:text-white transition duration-300">
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Player