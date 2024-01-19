import { Howl } from 'howler'

let clip = null
export const stop = () => {
  clip && console.log('stopping clip...', clip)
  if (clip) {
    clip.stop()
    clip.unload()
  }
  clip = null
}
export const isIdle = () => {
  console.log('is clip idle', clip === null)
  return clip === null
}
export const play = (song, { onProgress, onEnd }) => {
  stop()
  console.log('playing song...', song)
  clip = new Howl({
    src: [song.data.url],
    html5: true
  })
    .on('play', () => {
      requestAnimationFrame(function step() {
        onProgress && onProgress({ progress: clip.seek(), duration: clip.duration() })
        if (clip.playing()) requestAnimationFrame(step)
      })
    })
    .on('end', () => {
      onEnd && onEnd()
    })

  clip.play()
  console.log('clip', clip)
  return clip
}
export const pause = () => {
  console.log('pausing clip...', clip)
  clip && clip.playing() && clip.pause()
  return clip
}
export const isPaused = () => {
  console.log('is clip paused', clip && !clip.playing())
  return clip && !clip.playing()
}
export const resume = () => {
  console.log('resuming clip...', clip)
  clip && !clip.playing() && clip.play()
  return clip
}
export const duration = () => {
  if (!clip) return 0
  return clip.duration()
}
export const seek = (seconds, cb = () => {}) => {
  console.log('seeking clip...', clip)
  if (clip) {
    clip.seek(seconds)
    clip.once('seek', cb)
  }
  return clip
}
