<template>
  <div>
    <ConstraintOperator :model="model"/>
    <label>Any:<input type="checkbox" v-model="model.wildcard"/></label>
    <input type="text" v-model="model.conceptId" v-if="!model.wildcard"/>
    <span v-if="model.wildcard">
      <input type="text" value="*" disabled/>
    </span>
    <div class=dropdown>
        <button>Add</button>
        <div class="dropdown-content">
            <div>And refinement</div>
            <!-- <div v-on:click="">And refinement</div> -->
        </div>
    </div>
  </div>
</template>

<script>
import ConstraintOperator from './ConstraintOperator.vue'
export default {
  name: 'SubExpressionConstraint',
  props: {
    model: Object
  },
  components: {
    ConstraintOperator
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
