import React, { useState, useEffect } from 'react'
import { Music, Upload, Search, PlusCircle } from 'lucide-react'
import SongList from './components/SongList'
import UploadForm from './components/UploadForm'
import Player from './components/Player'
import PlaylistModal from './components/PlaylistModal'

interface Song {
  id: string
  title: string
  artist: string
  youtubeUrl: string
  coverImage: string
}

interface Playlist {
  id: string
  name: string
  songs: string[] // Array of song IDs
}

function App() {
  const [songs, setSongs] = useState<Song[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  useEffect(() => {
    // Load songs and playlists from localStorage on component mount
    const savedSongs = localStorage.getItem('songs')
    const savedPlaylists = localStorage.getItem('playlists')
    if (savedSongs) setSongs(JSON.parse(savedSongs))
    if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists))
  }, [])

  useEffect(() => {
    // Save songs and playlists to localStorage whenever they change
    localStorage.setItem('songs', JSON.stringify(songs))
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }, [songs, playlists])

  const addSong = (song: Song) => {
    setSongs([...songs, song])
    setShowUploadForm(false)
  }

  const playSong = (song: Song) => {
    setCurrentSong(song)
  }

  const addToPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, songs: [...playlist.songs, songId] }
        : playlist
    ))
  }

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      songs: []
    }
    setPlaylists([...playlists, newPlaylist])
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Music className="w-8 h-8 mr-2 text-green-500" />
          <h1 className="text-2xl font-bold">Spotilocal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search songs..."
              className="bg-transparent focus:outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </button>
          <button
            onClick={() => setShowPlaylistModal(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Playlist
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        {showUploadForm ? (
          <UploadForm addSong={addSong} />
        ) : (
          <SongList songs={songs} playSong={playSong} />
        )}
      </main>
      {currentSong && <Player song={currentSong} />}
      {showPlaylistModal && (
        <PlaylistModal
          createPlaylist={createPlaylist}
          closeModal={() => setShowPlaylistModal(false)}
        />
      )}
    </div>
  )
}

export default App