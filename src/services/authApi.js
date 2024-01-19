import { auth, db } from '@/plugins/firebase'
import '@/helpers/strings'
export default {
  register: async (data) => {
    try {
      const dto = toRegisterDto(data)
      console.log('registering...', dto)
      const cred = await auth.createUserWithEmailAndPassword(dto.email, data.password)
      await cred.user.updateProfile({ displayName: dto.name }) //profile is auth.currentUser, auth needs it
      await db.collection('users').doc(cred.user.uid).set(dto) //the users collection with all fields
      console.log('register succeed!', cred.user.uid, dto)
      return { id: cred.user.uid, displayName: dto.name }
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  },
  login: async (data) => {
    try {
      const cred = await auth.signInWithEmailAndPassword(data.email.toLowerCase(), data.password)
      console.log('login succeed!', cred.user.uid)
      return { id: cred.user.uid, displayName: cred.user.displayName }
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  },
  logout: async () => {
    try {
      await auth.signOut()
      console.log('logout succeed!')
    } catch (error) {
      console.log('error', error)
      return { error }
    }
  }
}
const toRegisterDto = (data) => {
  return {
    name: data.name.toUpperCaseWords(),
    email: data.email.toLowerCase(),
    age: data.age,
    country: data.country
  }
}
