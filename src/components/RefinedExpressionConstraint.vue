<template>
  <div>
    <SubExpressionConstraint :model="model.subexpressionConstraint"/>
    <EclRefinement :model="model.eclRefinement" :focusConcept="model.subexpressionConstraint"/>
  </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
import EclRefinement from './EclRefinement.vue'
export default {
  name: 'RefinedExpressionConstraint',
  props: {
    model: Object
  },
  components: {
    SubExpressionConstraint,
    EclRefinement
  }
}
</script>

<style scoped>
</style>
