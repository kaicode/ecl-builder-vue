<template>
  <div class="grid-container">
    <ConstraintOperator :model="model"/>
    <ConceptTypeahead :model="model" :ecl="ecl"/>
    <div class="dropdown" v-if="allowRefinement">
        <div class="add">+</div>
        <div class="dropdown-content">
          <div class="item-subtitle">Add refinement:</div>
          <div class="item" v-on:click="addAttribute">"And" attribute</div>
        </div>
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
    ConceptTypeahead
  },
  methods: {
    addAttribute() {
      this.$emit('addAttribute');
    }
  }
}
</script>

<style scoped>
.grid-container {
  margin-bottom: 5px;
}
</style>
