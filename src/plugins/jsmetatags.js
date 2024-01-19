export function getFileThumbnail(file) {
  return new Promise((resolve) => {
    window.jsmediatags.read(file, {
      onSuccess: function (tag) {
        const data = tag.tags.picture.data
        const format = tag.tags.picture.format
        const base64String = [...data].reduce((data, byte) => data + String.fromCharCode(byte), '')
        const albumArt = `data:${format};base64,${window.btoa(base64String)}`
        return resolve(albumArt)
      },
      onError: function () {
        return resolve(null)
      }
    })
  })
}
