import { db } from '@/plugins/firebase'
export default {
  async getMoreSongs(fromId = null, perPage = 10) {
    console.log('getting songs...')
    try {
      let snapshot, fromDoc
      if (!fromId) {
        snapshot = await db.collection('songs').orderBy('createdAt', 'desc').limit(perPage).get()
      } else {
        fromDoc = await db.collection('songs').doc(fromId).get()
        snapshot = await db
          .collection('songs')
          .orderBy('createdAt', 'desc')
          .startAfter(fromDoc)
          .limit(perPage)
          .get()
      }
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
  },
  async getSongById(id) {
    try {
      console.log('getting song...', id)
      const doc = await db.collection('songs').doc(id).get()
      if (!doc.exists) {
        const error = { message: 'song not found' }
        console.log('error', error)
        return { error }
      }
      const song = { id: doc.id, data: doc.data() }
      console.log('song', song)
      return { song }
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  }
}
