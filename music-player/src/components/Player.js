import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faMusic,
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
  showLibrary,
  setShowLibrary,
  currentSong,
  setCurrentSong,
  songLibrary,
}) => {
  const playMusic = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })
  const [myVolume, setMyVolume] = useState(1)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const handlePlay = () => {
    if (!isPlaying) {
      playMusic.current.play()
    } else {
      playMusic.current.pause()
    }
    setIsPlaying(!isPlaying)
  }

  const hanldeUpdateTime = event => {
    setSongInfo({
      ...songInfo,
      currentTime: Math.floor(event.target.currentTime),
      duration: Math.floor(event.target.duration),
    })

    if (
      event.target.duration != 0 &&
      event.target.currentTime === event.target.duration
    ) {
      let getCurrentInd = songLibrary.findIndex(
        item => item.id === currentSong.id
      )
      let update = (getCurrentInd + 1) % songLibrary.length
      setCurrentSong(songLibrary[update])
    }
    if (playMusic.current.paused) {
      // setIsPlaying(false)
    }
  }

  const getTime = (time = 0) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const handleChange = event => {
    playMusic.current.currentTime = parseInt(event.target.value)
    setSongInfo({
      ...songInfo,
      currentTime: parseInt(event.target.value),
    })
  }
  const handlePlayBackSpeed = e => {
    playMusic.current.playbackRate = e.target.value
    setPlaybackSpeed(e.target.value)
  }

  const handleUpdateSong = (type = '') => {
    let getCurrentInd = songLibrary.findIndex(
      item => item.id === currentSong.id
    )
    if (type === 'forward') {
      let update = (getCurrentInd + 1) % songLibrary.length
      setCurrentSong(songLibrary[update])
    } else if (type === 'back') {
      let update = (getCurrentInd - 1) % songLibrary.length

      setCurrentSong(
        songLibrary[update == -1 ? songLibrary.length - 1 : update]
      )
    }
  }

  useEffect(() => {
    playMusic.current.volume = 0.1
  }, [])

  useEffect(() => {
    if (isPlaying) {
      playMusic.current.play()
      playMusic.current.playbackRate = playbackSpeed
    }
  }, [currentSong])

  return (
    <div className="music-player">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2>music player</h2>
        <span
          className="library-button"
          onClick={() => setShowLibrary(!showLibrary)}
        >
          Library
          <FontAwesomeIcon icon={faMusic} />
        </span>
      </div>
      <div>
        <img
          className={`current-audio${isPlaying ? '' : 'pause-audio'}`}
          src={currentSong.cover}
          alt="cover_image"
          draggable="false"
        />
      </div>
      <marquee style={{ width: '25%', marginTop: '30px' }}>sadfasdfasd</marquee>
      <div>
        {getTime(songInfo.currentTime)}{' '}
        <input
          type="range"
          value={songInfo.currentTime}
          min={0}
          max={songInfo.duration || 0}
          onChange={handleChange}
        />
        {getTime(songInfo.duration || 0)}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '0px 0 30px',
        }}
      >
        <div>
          volume
          <input
            type="range"
            value={myVolume == 0.1 ? 1 : myVolume}
            min={0}
            max={10}
            onChange={e => {
              setMyVolume(e.target.value)
              playMusic.current.volume = e.target.value / 10
            }}
          />
        </div>
        <div style={{ margin: '50px 0' }}>
          <label title="Playback speeds">Playback speed:</label>
          <select onChange={handlePlayBackSpeed} value={playbackSpeed}>
            <option value={0.25}>0.25 x speed</option>
            <option value={0.5}>0.5 x speed</option>
            <option value={0.75}>0.75 x speed</option>
            <option value={1}>Normal speed</option>
            <option value={1.25}>1.25 x speed</option>
            <option value={1.5}>1.50 x speed</option>
            <option value={1.75}>1.75 x speed</option>
            <option value={2}>2 x speed</option>
          </select>
        </div>
      </div>
      <div className="app-player">
        <FontAwesomeIcon
          style={{ cursor: 'pointer' }}
          className="play"
          size="3x"
          icon={faAngleLeft}
          onClick={() => handleUpdateSong('back')}
        />

        <FontAwesomeIcon
          style={{ cursor: 'pointer' }}
          className="play"
          size="3x"
          onClick={handlePlay}
          icon={isPlaying ? faPause : faPlay}
        />

        <FontAwesomeIcon
          style={{ cursor: 'pointer' }}
          className="play"
          size="3x"
          icon={faAngleRight}
          onClick={() => handleUpdateSong('forward')}
        />
      </div>

      <div>
        <audio
          onTimeUpdate={hanldeUpdateTime}
          onLoadedMetadata={hanldeUpdateTime}
          src={currentSong.audio}
          ref={playMusic}
        />
      </div>

      {/* <Library showLibrary={showLibrary} setShowLibrary={setShowLibrary} /> */}
    </div>
  )
}

export default Player
