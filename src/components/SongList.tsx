import React from 'react'
import { Play, MoreHorizontal } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  youtubeUrl: string
  coverImage: string
}

interface SongListProps {
  songs: Song[]
  playSong: (song: Song) => void
}

const SongList: React.FC<SongListProps> = ({ songs, playSong }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {songs.length === 0 ? (
        <p className="text-gray-400 p-6 text-center">No songs added yet. Start by adding your favorite YouTube tracks!</p>
      ) : (
        <ul>
          {songs.map((song, index) => (
            <li key={song.id} className="flex items-center p-4 hover:bg-gray-700 transition duration-300">
              <span className="text-gray-400 mr-4 w-6 text-center">{index + 1}</span>
              <img className="h-12 w-12 rounded-md mr-4" src={song.coverImage} alt={song.title} />
              <div className="flex-1">
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => playSong(song)}
                  className="text-green-500 hover:text-green-400 transition duration-300"
                >
                  <Play className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-white transition duration-300">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SongList