<template>
  <div v-if="submitError" class="text-white text-center p-2 rounded mb-4 bg-orange-600">
    submit failed, something went wrong
  </div>
  <vee-form :validation-schema="veeSchema" @submit="submit">
    <vee-field
      as="textarea"
      name="comment"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
      placeholder="Your comment here..."
    ></vee-field>
    <ErrorMessage class="text-red-600" name="comment" />
    <button
      :disabled="isSubmitting"
      type="submit"
      class="py-1.5 px-3 rounded text-white bg-green-600 block"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import commentApi from '@/services/commentApi'
import { ErrorMessage } from 'vee-validate'
export default {
  name: 'CommentForm',
  methods: {
    async submit(values, actions) {
      this.isSubmitting = true
      this.submitError = null
      const { comment, error } = await commentApi.addComment({
        comment: values.comment.trim(),
        songId: this.$route.params.id
      })
      this.submitError = error
      if (!error) {
        actions.resetForm()
        this.$emit('submitData', comment)
      }
      this.isSubmitting = false
    }
  },
  data() {
    return {
      isSubmitting: false,
      submitError: null,
      veeSchema: {
        comment: 'required|min:1|max:255'
      }
    }
  },
  emits: ['submitData'],
  components: { ErrorMessage }
}
</script>
