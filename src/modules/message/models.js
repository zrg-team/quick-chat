export const MODULE_NAME = 'message'

export function youtubeParser (url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : false
}

export function spotifyParser (url) {
  try {
    const data = `${url}`.split('.com/user/')
    const arr = `spotify:user/${data[1]}`.split('/')
    return arr.join(':')
  } catch (err) {
    return undefined
  }
}
