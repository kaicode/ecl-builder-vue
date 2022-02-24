<template>
  <div id="app">
    ECL Builder Development Harness
    <ECLBuilder 
      apiUrl="/snowstorm/snomed-ct"
      branch="MAIN/2022-01-31"
      eclString="<< 64572001 |Disease (disorder)| : * = *"/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
