<template>
  <div class="grid-container">
    <ConstraintOperator :model="model"/>
    <ConceptTypeahead :model="model"/>
    <div class="add">+</div>
    <!-- <span v-if="model.wildcard">
      <input type="text" value="*" disabled/>
    </span> -->
    <!-- <div class=dropdown>
        <button>Add</button>
        <div class="dropdown-content">
            <div>And refinement</div>
        </div>
    </div> -->
  </div>
</template>

<script>
import ConstraintOperator from './ConstraintOperator.vue'
import ConceptTypeahead from './ConceptTypeahead.vue'
export default {
  name: 'SubExpressionConstraint',
  props: {
    model: Object
  },
  components: {
    ConstraintOperator,
    ConceptTypeahead
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
}

.dropdown-content {
  display: none;
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
