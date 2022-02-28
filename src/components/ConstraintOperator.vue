<template>
    <select v-model="model.operator">
        <option value="">Self</option>
        <option value="descendantof">&lt; Descendant of</option>
        <option value="descendantorselfof">&lt;&lt; Descendants or Self of</option>
        <option value="childof">&lt;! Child of</option>
        <option value="ancestorof">&gt; Ancestor of</option>
        <option value="ancestororselfof">&gt;&gt; Ancestor or Self of</option>
        <option value="parentof">&gt;! Parent of</option>
        <option value="memberOf">^ Member of</option>
    </select>
</template>

<script>
export default {
  name: 'ConstraintOperator',
  props: {
    model: Object
  },
  mounted: function() {
    if (!this.model.operator) {
      this.$set(this.model, 'operator', '');
    }
  }
}
</script>
