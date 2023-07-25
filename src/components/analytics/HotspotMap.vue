<template>
    <BaseMap @polygonDraw="polygonDraw"  ref="baseref"/>
</template>

<script>
import BaseMap from '../BaseMap.vue';
export default {
    components: {
        BaseMap
    },
    props: {
        
        
    },
    computed:{
    },
    methods: {
        polygonDraw(polygon) {
            this.$emit('polygonDraw',polygon)
        },
        updateHotspots(){
            this.$refs.baseref.updateHotspots()
        }
    },
    mounted(){
    }
}
</script>