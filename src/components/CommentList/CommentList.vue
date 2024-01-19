<template>
  <section class="container mx-auto mt-6" id="comments">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ comments.length }})</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Comment Form -->
        <CommentForm v-if="authStore.isAuth" @submitData="commentUpdate" />
        <div v-else class="w-full text-center text-gray-400">Login to comment</div>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <!-- Comments Load Error -->
  <div v-if="loadError" class="text-white text-center p-2 rounded my-4 bg-orange-600">
    cannot list comments, something went wrong
  </div>
  <ul class="container mx-auto">
    <CommentItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @delete="commentUpdate"
    />
  </ul>
</template>

<script>
import useAuthStore from '@/stores/authStore'
import useManageStore from '@/stores/manageStore'
import manageApi from '@/services/manageApi'
import commentApi from '@/services/commentApi'
import CommentItem from '@/components/CommentList/CommentItem.vue'
import CommentForm from '@/components/CommentList/CommentForm.vue'
import { mapStores } from 'pinia'
export default {
  name: 'CommentList',
  mounted() {
    this.getComments()
  },
  computed: {
    ...mapStores(useAuthStore, useManageStore)
  },
  methods: {
    async getComments() {
      const { comments, error } = await commentApi.getCommentsBySongId(this.$route.params.id)
      this.loadError = error
      comments && (this.comments = comments)
      error && console.log(error)
    },
    async commentUpdate() {
      const prevcommentsCount = this.comments.length
      await this.getComments()
      if (!this.loadError) {
        await manageApi.editSong({
          id: this.$route.params.id,
          values: { commentsCount: this.comments.length }
        })
        if (prevcommentsCount !== this.comments.length) {
          this.manageStore.hasUpdate = true
        }
      }
    }
  },
  data() {
    return {
      loadError: null,
      comments: []
    }
  },
  components: { CommentItem, CommentForm }
}
</script>
