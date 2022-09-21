<template>
    <div class="compoundExpressionConstraint">
        <div v-for="conjunctionExpressionConstraint in model.conjunctionExpressionConstraints" v-bind:key="conjunctionExpressionConstraint.id">
            <span class="or">And </span><SubExpressionConstraint :apiurl="apiurl" :branch="branch" :model="conjunctionExpressionConstraint" :allowRefinement="true" v-on:addAttribute="$emit('addAttribute', conjunctionExpressionConstraint)"/>
        </div>
        <div v-for="disjunctionExpressionConstraint in model.disjunctionExpressionConstraints" v-bind:key="disjunctionExpressionConstraint.id">
            <span class="or">Or </span><SubExpressionConstraint :apiurl="apiurl" :branch="branch" :model="disjunctionExpressionConstraint" :allowRefinement="true" v-on:addAttribute="$emit('addAttribute', disjunctionExpressionConstraint)"/>
        </div>
        <div v-if="model.exclusionExpressionConstraint">
            <span class="or">Minus </span><SubExpressionConstraint :apiurl="apiurl" :branch="branch" :model="model.exclusionExpressionConstraint" :allowRefinement="true" v-on:addAttribute="$emit('addAttribute', model.exclusionExpressionConstraint)"/>
        </div>
    </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
export default {
    name: 'CompoundExpressionConstraint',
    props: {
        apiurl: String,
        branch: String,
        model: Object
    },
    components: {
        SubExpressionConstraint
    }
}
</script>

<style scoped>
.compoundExpressionConstraint div:first-child span {
    display: none;
}
</style>
