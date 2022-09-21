<template>
  <div id="app">
    ECL Builder Development Harness
    <hr/>
    <ECLBuilder 
      apiurl="/snowstorm/snomed-ct"
      branch="MAIN/2022-07-31"
      :eclstring="eclString"
      v-on:eclOutput="eclOutput"
      />

      <button v-on:click="eclString = '*'">change</button>
      {{eclString}}
  </div>
</template>

<script>
import ECLBuilder from './components/ECLBuilder.vue'

export default {
  name: 'App',
  components: {
    ECLBuilder
  },
  data() {
    return {
      eclString: '< 64572001 |Disease (disorder)|'
    }
  },
  methods: {
    eclOutput(value) {
      console.log("Emitted eclOutput", value);
    }
  }
}
</script>

<style>
</style>
