<template>
  <div>
    <select v-model="model.operator">
        <option value="self">Self</option>
        <option value="descendantof">&lt; Descendant of</option>
        <option value="descendantorselfof">&lt;&lt; Descendants or Self of</option>
        <option value="childof">&lt;! Child of</option>
        <option value="ancestorof">&gt; Ancestor of</option>
        <option value="ancestororselfof">&gt;&gt; Ancestor or Self of</option>
        <option value="parentof">&gt;! Parent of</option>
        <option value="memberOf">^ Member of</option>
    </select>
    <input type="text" v-model="model.conceptId"/>
    <!-- <ConceptTypeahead/> -->
    <div class=dropdown>
        <button>Add</button>
        <div class="dropdown-content">
            <!-- <div v-on:click="">And refinement</div> -->
            <div >And refinement</div>
        </div>
    </div>
  </div>
</template>

<script>
// import ConceptTypeahead from './ConceptTypeahead.vue'

export default {
  name: 'FocusConcept',
  props: {
    model: Object
  },
  components: {
    // ConceptTypeahead
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
