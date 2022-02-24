<template>
  <div>
    <SubExpressionConstraint :model="model.subexpressionConstraint"/>
    <EclRefinement :model="model.eclRefinement"/>
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
