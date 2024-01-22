<template>
  <main class="bg">
    <section class="container mx-auto min-h-[100svh] py-20">
      <div class="bg-white bg-opacity-[0.98] p-6 mt-6">
        <SongDetail />
        <CommentList />
      </div>
    </section>
  </main>
</template>

<script>
import SongDetail from '@/components/SongDetail/SongDetail.vue'
import CommentList from '@/components/CommentList/CommentList.vue'
export default {
  name: 'SongView',
  components: { SongDetail, CommentList }
}
</script>
