<template>
  <div>
    <div class="grid-container" v-if="!model.nestedExpressionConstraint">
      <ConstraintOperator :model="model"/>
      <ConceptTypeahead :model="model" :ecl="ecl"/>
      <div class="dropdown" v-if="allowRefinement">
          <div class="add">+</div>
          <div class="dropdown-content">
            <div class="item-subtitle">Add refinement:</div>
            <div class="item" v-on:click="$emit('addAttribute')">"And" attribute</div>
          </div>
      </div>
    </div>
    <div v-if="model.nestedExpressionConstraint">
      <ExpressionConstraint :model="model.nestedExpressionConstraint"/>
    </div>
  </div>
</template>

<script>
import ConstraintOperator from './ConstraintOperator.vue'
import ConceptTypeahead from './ConceptTypeahead.vue'
export default {
  name: 'SubExpressionConstraint',
  props: {
    model: Object,
    attributeTypeParentConcept: Object,
    ecl: String,
    allowRefinement: Boolean
  },
  components: {
    ConstraintOperator,
    ConceptTypeahead,
    ExpressionConstraint: () => import('./ExpressionConstraint.vue')
  }
}
</script>

<style scoped>
.grid-container {
  margin-bottom: 5px;
}
</style>
