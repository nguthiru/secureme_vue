<template>
    <div class="container">

        <div class="close-button" @click="close">
            <div class="row">
                <i class="fas fa-times"></i>
                Close
            </div>

        </div>
        <div class="container" v-if="explorer_data !== null">

            <p class="section-title">Hotspot details</p>

            <div class="column">
                <!-- hotspot info -->
                <p class="section-sub-title">Stations Present</p>
                <div class="flex-wrap">
                    <div class="station-card" v-for="station in stations" :key=station>
                        {{ station.name }}
                    </div>
                </div>
            </div>
            <div class="column">
                <p class="section-sub-title">Prevalent Crimes</p>
                <div class="flex-wrap">
                    <div class="criminal-card card crime-card-analysis" v-for="crime in crimes" :key="crime.id">
                        {{ crime.name }}
                    </div>
                </div>
            </div>
            <div class="column">
                <p class="section-sub-title">Criminals in the area</p>
                <div class="flex-wrap">
                    <div class="criminal-card card" v-for="criminal in criminals" :key="criminal.id">
                        <div class="row">

                            <img :src="criminal.imageUrl" alt="" class="profile-photo small">
                            {{ criminal.name }}
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    </div>
</template>

<script>

export default {
    name: 'HotspotExplorer',
    data() {
        return {
        }
    },
    computed: {
        hotspot_data() {
            return this.$props.explorer_data
        },
        crimes() {
            let explorer_data = this.$props.explorer_data
            let temp = explorer_data.map(e => {
                return e.crime
            })

            return [... new Set(temp)]
        },
        stations() {

            let explorer_data = this.$props.explorer_data
            let temp = explorer_data.map(e => {

                return e.station
            })
            return [... new Set(temp)]
        },
        criminals() {
            let explorer_data = this.$props.explorer_data
            let temp = explorer_data.map(e => {
                return e.criminal
            })
            return [... new Set(temp)]
        }
    },
    props: {
        explorer_data: {
            required: true
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>