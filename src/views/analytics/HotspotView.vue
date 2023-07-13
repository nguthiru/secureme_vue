<template>
    <div class="hotspot-view">
        <section id="hotspot-map-view">
            <HotspotMap @polygonDraw="polygonDraw" :hotspots="hotspot_data"></HotspotMap>
        </section>

        <section id="hotspot-map-explorer" @click="explorerClick">
            <HotspotExplorer @close="showExplorer=false" v-if="showExplorer" :explorer_data="explorer_data" @click.stop ></HotspotExplorer>
        </section>
    </div>
</template>

<script>
import HotspotMap from '@/components/analytics/HotspotMap.vue';
import HotspotExplorer from '@/components/analytics/HotspotExplorer.vue';
export default {
    name: 'HotSpotView',
    components: {
        HotspotMap,
        HotspotExplorer
    },
    data(){
        return {
            showExplorer: false,
            hotspot_data: null,
            explorer_data: null
        }
    },
    methods:{
        polygonDraw(polygon){
            this.$axios.post('analytics/crime/polygon/',{polygon:polygon}).then(res=>{
                this.explorer_data = res.data
            }).catch(e=>{
                console.log(e)
            })
            this.showExplorer = true
        },
        explorerClick(){
            console.log(this.showExplorer)
            if(this.showExplorer===false){
                this.showExplorer=true
            }
        },
        getHotspots(){

            this.$axios.get('analytics/crime/arrests/').then(res=>{
                let data = res.data.map(e=>e.station_entity)
                this.hotspot_data = data
                console.log(this.hotspot_data)
            })
        }
    },

    mounted(){
        this.getHotspots()
    }
}
</script>