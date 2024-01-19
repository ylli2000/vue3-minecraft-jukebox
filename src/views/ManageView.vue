<template>
  <main class="bg">
    <section class="container min-h-screen mx-auto py-20">
      <div class="md:grid md:grid-cols-3 md:gap-4 mt-6">
        <div class="col-span-1">
          <SongsUpload @count="uploadsInProgress = $event" />
        </div>
        <div class="col-span-2">
          <SongsEdit />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import useAuthStore from '@/stores/authStore'
// import { mapStores } from 'pinia'
import SongsEdit from '@/components/SongsEdit/SongsEdit.vue'
import SongsUpload from '@/components/SongsUpload/SongsUpload.vue'
export default {
  name: 'ManageView',
  //   computed: {
  //     ...mapStores(useAuthStore)
  //   },
  //   beforeRouteEnter(to, from, next) {
  //     //7.c this keyword is not available here, cannot access this.authStore until after next()
  //     if (to.name === 'manage' && !useAuthStore().isAuth) {
  //       next({ name: 'home' })
  //     } else {
  //       next()
  //     }
  //   }

  //finalise the children using :ref=, for scoping reasons this is not preferred
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.songsUpload.cancelUploadTasks()
  //   next()
  // },
  components: {
    SongsUpload,
    SongsEdit
  },
  beforeRouteLeave(to, from, next) {
    this.uploadsInProgress && !confirm('Upload still in progress, leave anyway?')
      ? next(false)
      : next()
  },
  data() {
    return {
      uploadsInProgress: 0
    }
  }
}
</script>
