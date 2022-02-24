<template>
  <div>
    Expression Constraint
    <div>
      <SubExpressionConstraint v-if="model.wildcard || model.conceptId" :model="model"/>
      <RefinedExpressionConstraint v-if="model.eclRefinement" :model="model"/>
    </div>
  </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
import RefinedExpressionConstraint from './RefinedExpressionConstraint.vue'
export default {
  name: 'ExpressionConstraint',
  props: {
    model: Object
  },
  components: {
    SubExpressionConstraint,
    RefinedExpressionConstraint
  }
}
</script>

<style scoped>
</style>
