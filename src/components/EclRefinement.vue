<template>
    <div class="eclRefinement">
        <SubRefinement :model="model.subRefinement" :focusConcept="focusConcept"/>
        <div v-for="disjunctionSubRefinement in model.disjunctionSubRefinements" v-bind:key="disjunctionSubRefinement.id">
            Or <SubRefinement :model="disjunctionSubRefinement"/>
        </div>
    </div>
</template>

<script>
import SubRefinement from './SubRefinement.vue'
export default {
    name: 'EclRefinement',
    props: {
        model: Object,
        focusConcept: Object
    },
    components: {
        SubRefinement
    }
}
</script>

<style scoped>
.eclRefinement {
    padding-left: 15px;
}
</style>
