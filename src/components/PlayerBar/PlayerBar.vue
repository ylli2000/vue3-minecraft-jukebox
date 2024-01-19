<template>
  <div aria-label="player bar">
    <PlayerProvider>
      <template v-slot:provider="{ togglePlay, updateSeek }">
        <div class="fixed bottom-0 left-0 bg-white bg-opacity-90 px-4 py-2 w-full">
          <!-- Track Info -->
          <div v-if="playerStore.song" class="text-center">
            <span class="song-title font-bold">
              {{ playerStore.song.data.genre ? playerStore.song.data.genre + ' - ' : '' }}
              {{ playerStore.song.data.name }}
            </span>
            <span class="song-artist">
              &nbsp;by {{ playerStore.song.data.userName.split(' ')[0] }}
            </span>
          </div>
          <div class="flex flex-nowrap gap-4 items-center">
            <!-- Play/Pause Button -->
            <button class="focus:outline-none" type="button" @click="togglePlay()">
              <i
                class="text-gray-600 text-xl hover:text-green-800 transition duration-300"
                :class="playerStore.status === 'playing' ? 'fa fa-pause' : 'fa fa-play'"
              ></i>
            </button>
            <!-- Current Position -->
            <div class="player-currenttime text-center w-[60px]">{{ progressFormatted }}</div>
            <!-- Scrub Container  -->
            <div
              @click.prevent="updateSeek"
              class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
            >
              <!-- Player Ball -->
              <span
                class="absolute -top-2.5 -ml-2.5 text-lg text-gray-600 hover:text-green-800"
                :style="{ left: percentageFormatted }"
              >
                <i class="fas fa-circle"></i>
              </span>
              <!-- Player Progress Bar-->
              <span
                class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
                :style="{ width: percentageFormatted }"
              ></span>
            </div>
            <!-- Duration -->
            <div class="player-duration text-center w-[60px]">{{ durationFormatted }}</div>
          </div>
        </div>
      </template>
    </PlayerProvider>
  </div>
</template>

<script>
import { mmssFormatted, percentFormatted } from '@/helpers/times'
import PlayerProvider from '@/components/PlayerProvider/PlayerProvider.vue'
import usePlayerStore from '@/stores/playerStore'
import usePlaylistStore from '@/stores/playlistStore'
import { mapStores } from 'pinia'
export default {
  name: 'PlayerBar',
  emits: ['toggle'],

  computed: {
    ...mapStores(usePlayerStore, usePlaylistStore),
    progressFormatted() {
      return mmssFormatted(this.playerStore.progress)
    },
    durationFormatted() {
      return mmssFormatted(this.playerStore.duration)
    },
    percentageFormatted() {
      return percentFormatted(this.playerStore.progress, this.playerStore.duration)
    }
  },
  components: { PlayerProvider }
}
</script>
