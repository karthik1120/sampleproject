import React, { useState, useEffect } from 'react'
import './App.css'
import Player from './components/Player'
import './styles/app.scss'
import Library from './components/Library'
import { musicData } from '../src/components/musicData'

function App() {
  const [showLibrary, setShowLibrary] = useState(false)
  const [songLibrary, setSongLibrary] = useState(musicData)
  const [currentSong, setCurrentSong] = useState(songLibrary[0])

  useEffect(() => {
    let updated = songLibrary.map(item => {
      if (item.id === currentSong.id) {
        return {
          ...item,
          active: true,
        }
      } else return { ...item, active: false }
    })
    setSongLibrary(updated)
  }, [currentSong])

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Player
        showLibrary={showLibrary}
        setShowLibrary={setShowLibrary}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songLibrary={songLibrary}
      />
      <Library
        showLibrary={showLibrary}
        setShowLibrary={setShowLibrary}
        musicData={songLibrary}
        setCurrentSong={setCurrentSong}
      />
      {/* </header> */}
    </div>
  )
}

export default App
