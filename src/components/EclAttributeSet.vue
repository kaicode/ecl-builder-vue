<template>
    <div>
        <SubAttributeSet :model="model.subAttributeSet"/>
    </div>
</template>

<script>
import SubAttributeSet from './SubAttributeSet.vue'
export default {
    name: 'EclAttributeSet',
    props: {
        model: Object
    },
    components: {
        SubAttributeSet
    }
}
</script>

<style scoped>
</style>
