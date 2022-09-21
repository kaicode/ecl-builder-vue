<template>
    <div>
        <EclAttribute :apiurl="apiurl" :branch="branch" :model="model.attribute" :focusConcept="focusConcept"/>
    </div>
</template>

<script>
import EclAttribute from './EclAttribute.vue'
export default {
    name: 'SubAttributeSet',
    props: {
        apiurl: String,
        branch: String,
        model: Object,
        focusConcept: Object
    },
    components: {
        EclAttribute
    }
}
</script>

<style scoped>
</style>
