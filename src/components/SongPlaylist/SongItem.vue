<template>
  <li
    :id="`song-${song.id}`"
    class="flex justify-between items-center p-3 pl-6 transition duration-300 hover:bg-gray-50"
  >
    <div class="flex items-center gap-2 relative">
      <!-- Play button or placeholder -->
      <div class="w-4 min-w-[16px]">
        <button
          v-if="!isPlaying"
          @click.stop="playSong"
          type="button"
          class="text-gray-600 hover:text-green-800 focus:outline-none absolute top-0 left-0"
        >
          <i class="fa fa-play"></i>
        </button>
        <div v-if="isPlaying" class="flex flex-col -ml-2">
          <img
            v-if="playerStore.status === 'playing'"
            src="/assets/img/m-music-notes.gif"
            class="h-[32px] w-[32px] align-sub"
          />
        </div>
        <span v-else class="inline-block w-4"></span>
      </div>

      <div class="cursor-pointer">
        <RouterLink
          :to="{ name: 'song', params: { id: song.id } }"
          class="font-bold block text-gray-600"
        >
          {{ (song.data.genre ? song.data.genre + ' - ' : '') + song.data.name }}
        </RouterLink>
        <span class="text-gray-500 text-sm">
          {{ song.data.userName.split(' ')[0] }}
        </span>
      </div>
    </div>

    <div class="text-gray-600 text-lg">
      <!-- 
        'custom' attribute takes over the a tag and get full control of the element 
        'v-slot' attribute is used to get access to the internal 'navigate' function
        it destructures the routing logic and lets you control the navigation.
        
        hash: '#comments' is used to scroll to the comments section
      -->
      <RouterLink
        custom
        v-slot="{ navigate }"
        :to="{ name: 'song', params: { id: song.id }, hash: '#comments' }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.data.commentsCount || 0 }}
        </span>
      </RouterLink>
    </div>
  </li>
</template>

<script>
import { play, stop } from '@/plugins/howler'
import usePlayerStore from '@/stores/playerStore'
import usePlaylistStore from '@/stores/playlistStore'
import { mapStores } from 'pinia'
import { RouterLink } from 'vue-router'

export default {
  name: 'SongItem',
  props: ['song', 'isPlaying'],
  components: { RouterLink },
  computed: {
    ...mapStores(usePlayerStore, usePlaylistStore)
  },
  methods: {
    playSong() {
      // if already playing another song or idle, start this song
      stop()
      this.playerStore.setSong(this.song)
      play(this.song, { onProgress: this.onProgress, onEnd: this.onEnd })
      this.playerStore.setStatus('playing')
    },
    onProgress({ progress, duration }) {
      this.playerStore.setProgress(progress)
      this.playerStore.setDuration(duration)
    },
    onEnd() {
      stop()
      const songs = this.playlistStore.songs || []
      const index = songs.findIndex((s) => s.id === this.playerStore.song.id)
      // play next song if exists
      if (index !== -1 && index < songs.length - 1) {
        const nextSong = songs[index + 1]
        this.playerStore.setSong(nextSong)
        play(nextSong, { onProgress: this.onProgress, onEnd: this.onEnd })
      } else {
        this.playerStore.setStatus('idle')
      }
    }
  }
}
</script>
