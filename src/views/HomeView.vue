<template>
  <main>
    <HeroCarosuel />
    <SongPlaylist />
  </main>
</template>

<script>
import HeroCarosuel from '@/components/HeroCarosuel/HeroCarosuel.vue'
import SongPlaylist from '@/components/SongPlaylist/SongPlaylist.vue'
export default {
  name: 'HomeView',
  components: {
    HeroCarosuel,
    SongPlaylist
  }
}
</script>
