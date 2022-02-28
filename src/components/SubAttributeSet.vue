<template>
    <div>
        <EclAttribute :model="model.attribute" :focusConcept="focusConcept"/>
    </div>
</template>

<script>
import EclAttribute from './EclAttribute.vue'
export default {
    name: 'SubAttributeSet',
    props: {
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
