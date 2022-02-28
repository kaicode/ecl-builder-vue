<template>
    <div>
        <EclAttributeSet :model="model.eclAttributeSet" :focusConcept="focusConcept"/>
    </div>
</template>

<script>
import EclAttributeSet from './EclAttributeSet.vue'
export default {
    name: 'SubRefinement',
    props: {
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
