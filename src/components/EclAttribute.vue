<template>
    <div class="attribute-container">
        <div>
            With attribute
        </div>
        <SubExpressionConstraint :model="model.attributeName"/>
        <div v-if="model.expressionComparisonOperator" class="grid-container">
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
.attribute-container {
    background-color: #c9e5f4;
    /* display: inline-block; */
    /* text-align: left; */
    padding: 5px;
    border-radius: 10px;
}
.attribute-container div {
    display: inline-block;
    margin: 5px;
}
</style>
