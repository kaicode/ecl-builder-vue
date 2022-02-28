<template>
  <div>
    <SubExpressionConstraint :model="model.subexpressionConstraint"/>
    <EclRefinement :model="model.eclRefinement"/>
    <div class="dropdown">
      <span>Add</span>
        <div class="dropdown-content">
          <p>Hello World!</p>
        </div>
    </div>
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
  float: right;
  margin: 10px 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  margin-left: -90px;
  background-color: #f9f9f9;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.2);
  padding: 0 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
