<template>
    <div>
        <SubAttributeSet :model="model.subAttributeSet" :focusConcept="focusConcept"/>
        <div v-for="conjunctionAttribute in model.conjunctionAttributeSet" v-bind:key="conjunctionAttribute.id">
            And <SubAttributeSet :model="conjunctionAttribute"/>
        </div>
        <div v-for="disjunctionAttribute in model.disjunctionAttributeSet" v-bind:key="disjunctionAttribute.id">
            Or <SubAttributeSet :model="disjunctionAttribute"/>
        </div>
    </div>
</template>

<script>
import SubAttributeSet from './SubAttributeSet.vue'
export default {
    name: 'EclAttributeSet',
    props: {
        model: Object,
        focusConcept: Object
    },
    components: {
        SubAttributeSet
    }
}
</script>

<style scoped>
</style>
