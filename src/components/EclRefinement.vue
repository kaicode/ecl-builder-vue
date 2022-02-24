<template>
    <div>
        <SubRefinement :model="model.subRefinement"/>
    </div>
</template>

<script>
import SubRefinement from './SubRefinement.vue'
export default {
    name: 'EclRefinement',
    props: {
        model: Object
    },
    components: {
        SubRefinement
    }
}
</script>

<style scoped>
</style>
