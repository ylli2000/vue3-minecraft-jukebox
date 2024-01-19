<template>
  <div
    class="w-full px-10 py-20 rounded text-center border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
    :class="{ 'text-white bg-green-400 border-green-500 border-dashed': isDragOver }"
    @drop.prevent.stop="$emit('selectFiles', $event.dataTransfer.files)"
    @dragstart.prevent.stop=""
    @dragend.prevent.stop="$emit('dragOverChange', false)"
    @dragover.prevent.stop="$emit('dragOverChange', true)"
    @dragenter.prevent.stop="$emit('dragOverChange', true)"
    @dragleave.prevent.stop="$emit('dragOverChange', false)"
  >
    <h5>Drop your files here</h5>
  </div>
</template>
<script>
export default {
  name: 'UploaArea',
  props: ['isDragOver']
}
</script>
