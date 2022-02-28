<template>
  <div class="grid-container">
    <ConstraintOperator :model="model"/>
    <ConceptTypeahead :model="model" :ecl="ecl"/>
    <div class=dropdown>
        <div class="add">+</div>
        <div class="dropdown-content">
            <div v-on:click="addAttribute">And refinement</div>
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
    ecl: String
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
.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  width: 200px;
  margin-left: -100px;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
