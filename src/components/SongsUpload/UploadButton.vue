<template>
  <input
    id="upload-input"
    type="file"
    accept="audio/*"
    hidden
    @change="$emit('selectFiles', $event.target.files)"
    multiple
  />
  <label role="button" for="upload-input">
    <i
      class="fas fa-upload float-right text-green-400 text-2xl transition duration-500 hover:drop-shadow-lg"
    ></i>
  </label>
</template>

<script>
export default {
  name: 'UploadButton',
  emits: ['selectFiles']
}
</script>
