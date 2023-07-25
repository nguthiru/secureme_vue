<template>
    <div class="hotspot-view">
        <section id="hotspot-map-view">
            <HotspotMap @polygonDraw="polygonDraw" :hotspots="hotspot_data" :filters="filters"></HotspotMap>
        </section>
        <section id="hotspot-map-filters">
        </section>
        <section id="hotspot-map-explorer">
            <div class="column">

                <!-- <CriminalFilters @filter="filter" /> -->

                <HotspotExplorer :explorer_data="explorer_data" @close="showExplorer=false" v-if="showExplorer" @click.stop></HotspotExplorer>
            </div>
        </section>
    </div>
</template>

<script>
import HotspotMap from '@/components/analytics/HotspotMap.vue';
import HotspotExplorer from '@/components/analytics/HotspotExplorer.vue';
// import CriminalFilters from '@/components/analytics/CrimeFilters.vue'

export default {
    name: 'HotSpotView',
    components: {
        HotspotMap,
        HotspotExplorer,
        // CriminalFilters
    },
    data() {
        return {
            showExplorer: true,
            hotspot_data: null,
            explorer_data: null,
            filters: []
        }
    },
    
    methods: {
        polygonDraw(polygon) {
            this.$axios.post('analytics/crime/polygon/', { polygon: polygon }).then(res => {
                this.explorer_data = res.data
            }).catch(e => {
                console.log(e)
            })
            this.showExplorer = true
        },
        
        explorerClick() {
            if (this.showExplorer === false) {
                this.showExplorer = true
            }
        },
        getHotspots() {

            this.$axios.get('analytics/crime/arrests/').then(res => {
                
                let data = res.data.map(e => e.station)
                
                this.$store.dispatch('analysis/setHotspots', data)
            })
        },
        filter(filters) {
            if(filters.length!=0){

                let data = {
                    crimes: filters.map(e => e.id)
                }
                this.$axios.post('analytics/crime/arrests/filter/', data).then(res => {
                    let data = res.data.map(e => e.station)
                    this.$store.dispatch('analysis/setHotspots', data)
                    
                    
                })
            }
            else{
                this.getHotspots()
            }
        }
    },

    mounted() {
        this.getHotspots()
    }
}
</script>