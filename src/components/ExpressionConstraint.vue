<template>
  <div class="expression-constraint">
    Focus concepts <div class="add" v-if="!model.exclusionExpressionConstraint">+</div>
    <div v-if="model.wildcard || model.conceptId">
      <SubExpressionConstraint :model="model"/>
    </div>
    <div v-if="model.eclRefinement">
      <RefinedExpressionConstraint :model="model"/>
    </div>
    <div v-if="model.conjunctionExpressionConstraints || model.disjunctionExpressionConstraints || model.exclusionExpressionConstraint">
      <CompoundExpressionConstraint :model="model"/>
    </div>
  </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
import RefinedExpressionConstraint from './RefinedExpressionConstraint.vue'
import CompoundExpressionConstraint from './CompoundExpressionConstraint.vue'
export default {
  name: 'ExpressionConstraint',
  props: {
    model: Object
  },
  components: {
    SubExpressionConstraint,
    RefinedExpressionConstraint,
    CompoundExpressionConstraint
  }
}
</script>

<style scoped>
.expression-constraint {
  background-color: #f5e6e6;
  padding: 8px;
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #C8CFD6;
  text-align: left;
}
.expression-constraint div {
  margin: 5px;
}
</style>
