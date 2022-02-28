<template>
  <div>
    <SubExpressionConstraint :model="model.subexpressionConstraint" v-on:addAttribute="addAttribute" :allowRefinement="allowRefinement"/>
    <EclRefinement :model="model.eclRefinement" :focusConcept="model.subexpressionConstraint"/>
  </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
import EclRefinement from './EclRefinement.vue'
export default {
  name: 'RefinedExpressionConstraint',
  props: {
    model: Object,
    allowRefinement: Boolean
  },
  components: {
    SubExpressionConstraint,
    EclRefinement
  },
  methods: {
    addAttribute() {
      this.$emit('addAttribute');
    }
  }
}
</script>

<style scoped>
</style>
