<template>
    <BaseMap @polygonDraw="polygonDraw" :hotspots="hotspots"/>
</template>

<script>
import BaseMap from '../BaseMap.vue';
export default {
    components: {
        BaseMap
    },
    props: {
        hotspots: {
            required: true,
        }
    },
    methods: {
        polygonDraw(polygon) {
            this.$emit('polygonDraw',polygon)
        }
    }
}
</script>