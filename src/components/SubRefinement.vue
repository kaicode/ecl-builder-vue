<template>
    <div>
        <EclAttributeSet :model="model.eclAttributeSet"/>
    </div>
</template>

<script>
import EclAttributeSet from './EclAttributeSet.vue'
export default {
    name: 'SubRefinement',
    props: {
        model: Object
    },
    components: {
        EclAttributeSet
    }
}
</script>

<style scoped>
</style>
