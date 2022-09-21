<template>
    <div>
        <EclAttributeSet :apiurl="apiurl" :branch="branch" :model="model.eclAttributeSet" :focusConcept="focusConcept"/>
    </div>
</template>

<script>
import EclAttributeSet from './EclAttributeSet.vue'
export default {
    name: 'SubRefinement',
    props: {
        apiurl: String,
        branch: String,
        model: Object,
        focusConcept: Object
    },
    components: {
        EclAttributeSet
    }
}
</script>

<style scoped>
</style>
