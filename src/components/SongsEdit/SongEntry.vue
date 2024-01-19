<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <SongHeader v-if="!isEditing" :song="song" @edit="songEdit" @error="deleteError" />
    <SongForm v-if="isEditing" :song="song" @cancel="editCancel" />
  </div>
</template>

<script>
import SongForm from './SongForm.vue'
import SongHeader from './SongHeader.vue'

export default {
  name: 'SongEntry',
  props: ['song', 'isEditing'],
  methods: {
    songEdit() {
      this.$emit('edit', this.song)
    },
    editCancel() {
      this.$emit('cancel', this.song)
    },
    deleteError() {
      this.$emit('error', this.song)
    }
  },
  components: { SongHeader, SongForm }
}
</script>
