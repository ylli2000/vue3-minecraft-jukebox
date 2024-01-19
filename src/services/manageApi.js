import { db, storage, auth } from '@/plugins/firebase'
import { getFileThumbnail } from '@/plugins/jsmetatags'
export default {
  uploadSongFile(file) {
    const rootRef = storage.ref() //e.g. ref to music-app.appspot.com/songs
    const storageRef = rootRef.child('songs/' + file.name) //e.g. ref to music-app.appspot.com/songs/just-another-song.mp3
    const task = storageRef.put(file)
    return { storageRef, task }
  },
  async deleteSongFile(storageName) {
    try {
      const rootRef = storage.ref()
      const storageRef = rootRef.child('songs/' + storageName)
      return await storageRef.delete()
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  },
  async addSong(progressFile) {
    try {
      const thumb = await getFileThumbnail(progressFile.file)
      const url = await progressFile.storageRef.getDownloadURL()
      const d = Date.now()
      const doc = {
        //genre: null,
        name: progressFile.file.name,
        storageName: progressFile.file.name,
        url,
        thumb,
        size: progressFile.file.size,
        type: progressFile.file.type,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userPhoto: auth.currentUser.photoURL,
        commentsCount: 0,
        createdAt: d,
        updatedAt: d
      }
      console.log('adding song...', doc)
      const ref = await db.collection('songs').add(doc)
      const song = { id: ref.id, data: doc }
      console.log('song', song)
      return song
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  },
  async editSong({ id, values }) {
    try {
      const d = Date.now()
      const doc = {
        ...values,
        updatedAt: d
      }
      console.log('editing song...', doc)
      await db.collection('songs').doc(id).update(doc)
      const song = { id, data: doc }
      console.log('song', song)
      return song
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  },
  async deleteSong(id) {
    try {
      console.log('deleting song...', id)
      await db.collection('songs').doc(id).delete()
      return { id }
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  },
  async isFileNameInUse(fileName) {
    console.log('checking file name...', fileName)
    const snapshot = await db
      .collection('songs')
      .where('storageName', '==', fileName)
      .limit(1)
      .get()
    return snapshot.metadata.fromCache || !snapshot.empty
  },
  async getSongsByCurrentUser() {
    try {
      console.log('getting songs...')
      const snapshot = await db
        .collection('songs')
        .orderBy('createdAt', 'desc')
        .where('userId', '==', auth.currentUser.uid)
        .get()
      if (snapshot.metadata.fromCache) {
        //it indicates an error here:
        //await get() will not throw any network error
        //but metadata.fromCache will bet set to true with doc being empty
        const error = { message: 'metadata is from cache' }
        console.log('error', error)
        return { error }
      }
      const songs = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      console.log('songs', songs)
      return { songs }
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  }
}
