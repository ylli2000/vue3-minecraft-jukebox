<template>
  <template v-if="!data && !error">
    <i class="fas fa-spinner fa-spin"></i>
  </template>
  <template v-if="error">
    <div class="text-white text-center p-2 rounded mb-4 bg-orange-600">
      offline mode, could not get updated data
    </div>
  </template>
  <template v-if="Array.isArray(data) && !data.length">
    <div class="text-gray-400 w-full my-10 flex justify-center items-center">list is empty</div>
  </template>
  <template v-if="(Array.isArray(data) && data.length) || (!Array.isArray(data) && data)">
    <slot></slot>
  </template>
</template>

<script>
export default {
  name: 'SuspendHandler',
  props: ['data', 'error']
}
</script>
