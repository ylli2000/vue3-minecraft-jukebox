<template>
  <div>
    <div v-if="error" class="text-white text-center p-2 rounded mb-4 bg-orange-600">
      update failed, something went wrong
    </div>
    <div v-if="succeed" class="text-white text-center p-2 rounded mb-4 bg-green-600">
      update succeed
    </div>
    <vee-form :validation-schema="veeSchema" :initial-values="veeDefaults" @submit="save">
      <div class="flex w-full justify-between">
        <img v-if="song.data.thumb" :src="song.data.thumb" class="w-[24px] h-auto align-sub" />
        <button @click="$emit('cancel')" :disabled="isUpdating">
          <i class="fa fa-times text-right"></i>
        </button>
      </div>
      <div class="mb-3">
        <label class="inline-block mb-2 font-bold">Song Title</label>
        <vee-field
          name="name"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Song Title"
          :value="song.data.name"
        />
        <ErrorMessage class="text-red-600" name="name" />
      </div>
      <div class="mb-3">
        <label class="inline-block mb-2 font-bold">Genre</label>
        <vee-field
          name="genre"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Genre"
        />
        <ErrorMessage class="text-red-600" name="genre" />
      </div>
      <div class="flex w-full justify-end">
        <button
          type="submit"
          class="py-1.5 px-6 rounded text-white bg-green-600 mr-2"
          @click="$emit('save')"
          :disabled="isUpdating"
        >
          Save
        </button>

        <button
          type="button"
          class="py-1.5 px-6 rounded text-white bg-gray-600"
          @click="$emit('cancel')"
          :disabled="isUpdating"
        >
          Close
        </button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import { ErrorMessage } from 'vee-validate'
import manageApi from '@/services/manageApi'
import useManageStore from '@/stores/manageStore'
import { mapStores } from 'pinia'
export default {
  name: 'SongForm',
  props: ['song'],
  computed: {
    ...mapStores(useManageStore)
  },
  methods: {
    async save(values) {
      console.log('saving song data...', values)
      this.isUpdating = true
      this.error = null
      this.succeed = false
      const { id, error } = await manageApi.editSong({
        id: this.song.id,
        values
      })
      if (error) {
        console.log('error updating song data', error)
        this.error = error
      } else {
        const song = { id, data: { ...this.song.data, ...values } }
        console.log('updating song store...', song)
        this.manageStore.setSong(song)
        console.log('song data updated', song)
        this.succeed = true
        this.$emit('update', song)
      }
      this.manageStore.hasUpdate = true
      this.isUpdating = false
    }
  },
  data() {
    return {
      error: null,
      succeed: false,
      isUpdating: false,
      veeSchema: {
        name: 'required|min:1|max:50',
        genre: 'min:1|max:50'
      },
      veeDefaults: {
        name: this.song.data.name,
        genre: this.song.data.genre ?? ''
      }
    }
  },
  components: { ErrorMessage }
}
</script>
