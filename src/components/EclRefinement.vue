<template>
    <div class="eclRefinement">
        <SubRefinement :apiurl="apiurl" :branch="branch" :model="model.subRefinement" :focusConcept="focusConcept"/>
        <div v-for="disjunctionSubRefinement in model.disjunctionSubRefinements" v-bind:key="disjunctionSubRefinement.id">
            Or <SubRefinement :apiurl="apiurl" :branch="branch" :model="disjunctionSubRefinement"/>
        </div>
    </div>
</template>

<script>
import SubRefinement from './SubRefinement.vue'
export default {
    name: 'EclRefinement',
    props: {
        apiurl: String,
        branch: String,
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
