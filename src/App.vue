<template>
  <div id="app">
    ECL Builder Development Harness
    <hr/>
    <ECLBuilder 
      apiurl="/snowstorm/snomed-ct"
      branch="MAIN/2022-01-31"
      eclstring="< 64572001 |Disease (disorder)|"/>
  </div>
</template>

<script>
import ECLBuilder from './components/ECLBuilder.vue'

export default {
  name: 'App',
  components: {
    ECLBuilder
  }
}
</script>

<style>
</style>
