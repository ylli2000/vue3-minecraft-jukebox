import moment from 'moment'

export const mmssFormatted = (s) => {
  const d = moment.duration(s * 1000)
  return `${d.minutes().toString().padStart(2, '0')}:${d.seconds().toString().padStart(2, '0')}`
}

export const percentFormatted = (progress, duration) => {
  return duration ? ((progress / duration) * 100).toFixed(2) + '%' : '0'
}
