<template>
  <vee-form :validation-schema="veeSchema" :initial-values="veeDefaults" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        as="input"
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        as="input"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        as="input"
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <!-- :bails="false" means do not bail, check all errors -->
        <input
          v-bind="field"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <div class="text-red-600" v-for="error in errors" :key="error" :aria-errormessage="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        as="input"
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        aria-placeholder="Select a country..."
        placeholder="Select a country..."
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="" selected disabled hidden>Select a country...</option>
        <option value="Australia">Australia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Malaysia">Malaysia</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS, note the value="1" is a must for vee-field -->
    <div class="mb-3 pl-6">
      <vee-field
        value="1"
        as="input"
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <div>
        <label class="inline-block">Accept terms of service</label>
        <!-- 
          $t(key.path) and <i18n-t keypath> can both output the text in the current language,
          in your i18n en.json file, you can do something like this:
          "register": {
            "I_accept": "I accept the {0}",
            "tos": "terms of service"
          }

          where {0} is the child component, then here you can do:
          <i18n-t tag="label" class="inline-block" keypath="register.I_accept" >
            <a href="your_tos_link">$t("register.tos") }}</a>
          </i18n-t>

          to change locale, simply make a function:
          changeLocale(locale) {
            this.$i18n.locale = locale //'en', 'fr', 'zh'...etc
          }
          currentLocale() {
            return this.$i18n.locale //'en', 'fr', 'zh'...etc
          }
          then you can do:
          <ul>
            <li @click="changeLocale('en')">English</li>
            ...
          </ul>
         -->
      </div>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      :disabled="modalStore.isRegisterInProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import authApi from '@/services/authApi'
import useAuthStore from '@/stores/authStore'
import useModalStore from '@/stores/modalStore'
import { mapStores } from 'pinia'
import { ErrorMessage } from 'vee-validate'
export default {
  name: 'RegisterForm',
  computed: {
    ...mapStores(useAuthStore, useModalStore)
  },
  methods: {
    async register(data) {
      this.modalStore.setRegisterInProgress(true)
      this.modalStore.setAlertVisible(true)
      this.modalStore.setAlertVariant('info')
      this.modalStore.setAlertMessage('please wait... your account is being created.')
      const { id, displayName, error } = await authApi.register(data)
      if (!error) {
        this.authStore.setId(id)
        this.authStore.setDisplayName(displayName)
        this.authStore.setIsAuth(true)
        this.modalStore.clearAlert()
        this.modalStore.setOpen(false)
      } else {
        this.modalStore.setAlertVariant('warning')
        this.modalStore.setAlertMessage(
          error.message ?? 'an error occured while creating your account.'
        )
      }
      //finally
      this.modalStore.setRegisterInProgress(false)
    }
  },
  data() {
    return {
      veeSchema: {
        name: 'required|min:3|max:50|alpha_spaces',
        email: 'required|email',
        password: 'required|min:6|max:50|excluded:password,asdf,1111',
        confirmPassword: 'confirmed:@password',
        age: 'required|numeric|min_value:18|max_value:100',
        country: 'required|excluded:Select a country...',
        tos: 'tos'
      },
      veeDefaults: {
        name: 'kelvin'
      }
    }
  },
  components: { ErrorMessage }
}
</script>
