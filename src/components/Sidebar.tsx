import React from 'react'
import { Home, Search, Library, PlusSquare } from 'lucide-react'

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-black p-6">
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white transition duration-300">
              <Home className="w-6 h-6 mr-4" />
              Home
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white transition duration-300">
              <Search className="w-6 h-6 mr-4" />
              Search
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white transition duration-300">
              <Library className="w-6 h-6 mr-4" />
              Your Library
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">PLAYLISTS</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white transition duration-300">
              <PlusSquare className="w-5 h-5 mr-3" />
              Create Playlist
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              Liked Songs
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar