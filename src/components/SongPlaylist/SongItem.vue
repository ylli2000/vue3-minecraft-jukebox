<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <div v-if="isPlaying" class="flex -ml-2 -mt-2">
        <img src="/assets/img/m-guitar-play.gif" class="h-[32px] w-auto align-sub" />
        <img src="/assets/img/m-music-notes.gif" class="h-[36px] w-auto align-sub" />
      </div>
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
import { RouterLink } from 'vue-router'

export default {
  name: 'SongItem',
  props: ['song', 'isPlaying'],
  components: { RouterLink }
}
</script>
