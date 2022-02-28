<template>
    <div>
        <EclAttribute :model="model.attribute"/>
    </div>
</template>

<script>
import EclAttribute from './EclAttribute.vue'
export default {
    name: 'SubAttributeSet',
    props: {
        model: Object
    },
    components: {
        EclAttribute
    }
}
</script>

<style scoped>
</style>
