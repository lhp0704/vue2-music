export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const playMode = state => state.playMode
export const currentIndex = state => state.currentIndex
export const playSong = state => {
  state.playlist[state.currentIndex] || {}
}
