<template>
    <div class="compoundExpressionConstraint">
        <div v-for="conjunctionExpressionConstraint in model.conjunctionExpressionConstraints" v-bind:key="conjunctionExpressionConstraint.id">
            <span class="or">And </span><SubExpressionConstraint :model="conjunctionExpressionConstraint" v-on:addAttribute="addAttribute"/>
        </div>
        <div v-for="disjunctionExpressionConstraint in model.disjunctionExpressionConstraints" v-bind:key="disjunctionExpressionConstraint.id">
            <span class="or">Or </span><SubExpressionConstraint :model="disjunctionExpressionConstraint" v-on:addAttribute="addAttribute"/>
        </div>
        <div v-if="model.exclusionExpressionConstraint">
            <span class="or">Minus </span><SubExpressionConstraint :model="model.exclusionExpressionConstraint" v-on:addAttribute="addAttribute"/>
        </div>
    </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
export default {
    name: 'CompoundExpressionConstraint',
    props: {
        model: Object
    },
    components: {
        SubExpressionConstraint
    },
    methods: {
        addAttribute: function() {
            this.$emit('addAttribute');
        }
    }
}
</script>

<style scoped>
.compoundExpressionConstraint div:first-child span {
    display: none;
}
</style>
