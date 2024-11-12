<template>
  <SignUpForm :signUpPrestatire="signUpPrestatire" @updateSignUp="signUpPrestatire = $event" v-if="signUpPrestatire === false"></SignUpForm>
  <ComponentsPrestataire :signUpPrestatire="signUpPrestatire" v-else></ComponentsPrestataire>
</template>

<script>
import {defineComponent} from "vue";
import SignUpForm from "@/components/SignUpComponent.vue";
import ComponentsPrestataire from "@/components/ComponentsPrestataire.vue";

export default defineComponent({
  components: {ComponentsPrestataire, SignUpForm},
  data(){
    return{
      signUpPrestatire: false,
    }
  }
})
</script>