<template>
  <div
    class="text-white text-center p-2 rounded mb-4"
    :class="alert.type === 'success' ? ' bg-green-600' : ' bg-orange-600'"
  >
    {{ alert.message }}
  </div>
</template>

<script>
export default {
  name: 'UploadAlert',
  props: ['alert']
}
</script>
