import React from 'react'

const Library = ({
  showLibrary,
  setShowLibrary,
  musicData,
  setCurrentSong,
}) => {
  return (
    <div className={`my-library ${showLibrary ? `active-library` : ''}`}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '30px',
        }}
      >
        <h2 style={{ margin: 0, padding: 0 }}>Library</h2>
        <span
          style={{ fontWeight: 800, cursor: 'pointer' }}
          onClick={() => setShowLibrary(!showLibrary)}
        >
          {' '}
          X
        </span>
      </div>
      <div className="library-songs">
        {musicData.map(item => {
          return (
            <div
              key={item.id}
              className={`single-song ${item.active ? `song-active` : ''}`}
              onClick={() => setCurrentSong(item)}
            >
              <img src={`${item.cover}`} alt={'song_cover_image'} />
              <div>
                {JSON.stringify(item.active)}
                <h2 style={{ margin: 0 }}>{item.name}</h2>
                <div>{item.name}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Library
