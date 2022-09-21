<template>
    <div>
        <SubAttributeSet :apiurl="apiurl" :branch="branch" :model="model.subAttributeSet" :focusConcept="focusConcept"/>
        <div v-for="conjunctionAttribute in model.conjunctionAttributeSet" v-bind:key="conjunctionAttribute.id">
            And <SubAttributeSet :apiurl="apiurl" :branch="branch" :model="conjunctionAttribute" :focusConcept="focusConcept"/>
        </div>
        <div v-for="disjunctionAttribute in model.disjunctionAttributeSet" v-bind:key="disjunctionAttribute.id">
            Or <SubAttributeSet :apiurl="apiurl" :branch="branch" :model="disjunctionAttribute" :focusConcept="focusConcept"/>
        </div>
    </div>
</template>

<script>
import SubAttributeSet from './SubAttributeSet.vue'
export default {
    name: 'EclAttributeSet',
    props: {
        apiurl: String,
        branch: String,
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
