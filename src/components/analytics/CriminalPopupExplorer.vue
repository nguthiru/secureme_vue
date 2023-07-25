<template>
    <div class="popup card">
        <div class="popup-header">
            <div class="row">
                <img :src="criminal.imageUrl" alt="" class="profile-photo small">
                <div class="column">
                    <p class="detail_label">{{ criminal.name }}</p>
                    <p class="caption">{{ criminal.dateOfBirth }}</p>
                </div>
            </div>
        </div>

        <div class="popup-body">
            <div class="column container">
                <p class="subtitle">Crimes Committed</p>
                <div class="flex-wrap">
                    <div class="criminal-card card crime-card-analysis" v-for="crime in crimes" :key="crime.id">
                        {{ crime.name }}
                    </div>
                </div>
            </div>
            <div class="column container">
                <p class="subtitle">Stations Arrested</p>
                <div class="flex-wrap">
                    <div class="criminal-card card crime-card-analysis" v-for="station in stations" :key="station.id">
                        {{ station.name }}
                    </div>
                </div>
            </div>
        </div>

        <div class="popup-footer">

            <div class="row space-btn">
                <div class="row error pointer" @click="$emit('close')">
                    <i class="fa fa-times"></i>
                    Close
                </div>
                <button class="primary-btn" @click="exploreNetwork">
                    Explore Network
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    name: 'CriminalPopupExplorer',
    components: {
    },
    props: {
        criminal: {
            required: true
        }
    },
    data() {

        return {
            markers: [],
            crimes: [],
            stations: [],

        }
    },

    methods: {
        getCriminalArrestDetails() {
            this.$axios.get(`analytics/criminal/arrests/${this.$props.criminal.idNumber}`).then(res => {
                this.crimes = res.data.map(e => e.crime)
                this.stations = res.data.map(e => e.station)
            })
        },
        exploreNetwork() {
            this.$router.push({name:'network_explorer_detail',params:{
                id: this.criminal.idNumber
            }});
    }
},
mounted() {
    this.getCriminalArrestDetails()
}
}
</script>