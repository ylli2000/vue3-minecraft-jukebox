<template>
  <PlayerProvider>
    <template v-slot:provider="{ togglePlay }">
      <section class="w-full mb-8 py-14 text-center text-white relative">
        <div
          class="absolute inset-0 w-full h-full box-border bg-contain music-bg flex items-center"
        >
          <div class="w-full py-[112px] bg-black bg-opacity-20"></div>
        </div>
        <div class="container pl-8 md:pl-20 py-10 flex items-center">
          <!-- Play/Pause Button -->
          <div
            v-if="playerStore.onPageSong"
            class="z-10 w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] md:w-[128px] md:h-[128px] flex justify-center items-center shadow-2xl"
            :style="{
              'background-position': 'center',
              'background-size': 'cover',
              'background-image': `url(${
                playerStore.onPageSong?.data?.thumb || '/assets/img/song-header.png'
              })`
            }"
          >
            <button
              @click="() => togglePlay('onPage')"
              type="button"
              class="relative h-12 w-12 text-xl bg-white text-gray-800 rounded-full shadow-2xl focus:outline-none hover:text-green-800 transition duration-300"
            >
              <i
                class="absolute top-1/2 left-1/2 -translate-y-1/2"
                :class="
                  playerStore.onPageSong?.id === playerStore.song?.id &&
                  playerStore.status === 'playing'
                    ? 'fa fa-pause -translate-x-1/2'
                    : 'fa fa-play -translate-x-[42%] '
                "
              ></i>
            </button>
          </div>

          <div v-if="playerStore.onPageSong" class="z-10 text-left ml-8 p-2 shadow-2xl">
            <!-- Song Info -->
            <div class="text-lg md:text-4xl font-bold shadow-2xl">
              {{ playerStore.onPageSong.data.name }}
            </div>
            <div class="text-md md:text-xl shadow-2xl">
              {{ playerStore.onPageSong.data.userName.split(' ')[0] }}
            </div>
          </div>
        </div>
      </section>
      <section
        v-if="playerStore.onPageSong"
        class="w-full px-4 text-md leading-loose grid grid-cols-2 gap-4"
      >
        <div class="border px-2">
          Upload file name: {{ playerStore.onPageSong.data.storageName }}
        </div>
        <div class="border px-2">File type: {{ playerStore.onPageSong.data.type }}</div>
        <div class="border px-2">
          File size: {{ (playerStore.onPageSong.data.size / (1024 * 1024)).toFixed(2) }}mb
        </div>
        <div class="border px-2">
          Created at: {{ new Date(playerStore.onPageSong.data.createdAt).toLocaleString() }}
        </div>
        <div class="border px-2">
          Download:
          <a
            :href="playerStore.onPageSong.data.url"
            download
            rel="noopener noreferrer"
            target="_blank"
          >
            <i class="text-gray-600 fas fa-download"></i>
          </a>
        </div>
        <div class="border px-2">
          Last modified: {{ new Date(playerStore.onPageSong.data.updatedAt).toLocaleString() }}
        </div>
      </section></template
    >
  </PlayerProvider>
</template>

<script>
import playlistApi from '@/services/playlistApi'
import usePlayerStore from '@/stores/playerStore'
import { mapStores } from 'pinia'
import PlayerProvider from '../PlayerProvider/PlayerProvider.vue'
export default {
  name: 'SongDetail',
  mounted() {
    this.getSong()
  },
  beforeUnmount() {
    this.playerStore.setOnPageSong(null)
  },
  computed: {
    ...mapStores(usePlayerStore)
  },
  methods: {
    async getSong() {
      const { song, error } = await playlistApi.getSongById(this.$route.params.id)
      this.playerStore.setOnPageSong(song) //so that the Player Provider knows what song can be played
      this.error = error
    }
  },
  data() {
    return {
      error: null
    }
  },
  components: { PlayerProvider }
}
</script>
