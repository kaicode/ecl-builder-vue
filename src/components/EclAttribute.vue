<template>
    <div>
        ECLAttribute
        attributeName: <SubExpressionConstraint :model="model.attributeName"/>
        <div v-if="model.expressionComparisonOperator">
            <select v-model="model.expressionComparisonOperator">
                <option>=</option>
                <option>!=</option>
            </select>
            <SubExpressionConstraint :model="model.value"/>
        </div>
        <div v-if="model.numericComparisonOperator">
            Numeric concrete domains not yet supported.
        </div>
        <div v-if="model.stringComparisonOperator">
            String concrete domains not yet supported.
        </div>
        <div v-if="model.booleanComparisonOperator">
            Boolean concrete domains not yet supported.
        </div>
    </div>
</template>

<script>
import SubExpressionConstraint from './SubExpressionConstraint.vue'
export default {
    name: 'EclAttribute',
    props: {
        model: Object
    },
    components: {
        SubExpressionConstraint
    }
}
</script>

<style scoped>
</style>
