<template>
  <li class="p-6 bg-gray-50 border border-gray-200">
    <div v-if="deleteError" class="text-white text-center p-2 rounded mb-4 bg-orange-600">
      delete failed, something went wrong
    </div>
    <div class="flex justify-between mb-5">
      <!-- Comment Author -->
      <div>
        <div class="font-bold">{{ comment.data.userName }}</div>
        <time>{{ commentTime() }}</time>
      </div>
      <div v-if="isUser()">
        <button :disabled="isDeleting" aria-label="delete comment" @click="deleteComment">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <p>
      {{ comment.data.comment }}
    </p>
  </li>
</template>

<script>
import { auth } from '@/plugins/firebase'
import commentApi from '@/services/commentApi'
import moment from 'moment'
export default {
  name: 'CommentItem',
  props: ['comment'],
  mounted() {
    console.log('comment item mounted', this.comment.data.comment)
  },
  methods: {
    commentTime() {
      return moment(this.comment.data.createdAt).fromNow()
    },
    isUser() {
      return auth.currentUser && auth.currentUser.uid === this.comment.data.userId
    },
    async deleteComment() {
      this.isDeleting = true
      const { error } = await commentApi.deleteComment(this.comment)
      this.deleteError = error
      if (!error) {
        this.$emit('delete', this.comment)
      }
      this.isDeleting = false
    }
  },
  data() {
    return {
      isDeleting: false,
      deleteError: null
    }
  }
}
</script>
