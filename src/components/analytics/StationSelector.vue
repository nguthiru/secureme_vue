<template>
    <Teleport to="#app">
        <div class="popup">
            <div class="popup-header">
                <h4>Select a station</h4>
                <p class="caption">Select a station for analysis</p>
            </div>
            <div class="popup-body">
                <select name="" id="" v-model="selectedStation">
                    <option :value="station.id" v-for="station in stations" :key="station.id">{{ station.name }}</option>

                </select>
            </div>
            <div class="popup-footer">
                <button class="primary-btn" @click="selectArea">Select This Area</button>
            </div>
        </div>

    </Teleport>
</template>

<script>

export default {

    data() {
        return {
            selectedStation: null,
            stations: []
        }
    },
    methods: {
        selectArea() {
            if (this.selectedStation != null) {

                let station = this.stations.find(e => e.id === this.selectedStation)
                this.$emit('selectArea', station)
            }
        },
        getStations() {
            this.$axios.get('police/stations/').then(res => {
                this.stations = res.data
                this.selectedStation = this.stations[0].id
            }).catch(e => {
                console.log(e)
            })
        }
    },
    mounted() {
        this.getStations()
    }
}
</script>