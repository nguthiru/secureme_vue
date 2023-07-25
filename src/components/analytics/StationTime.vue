<template>
    <StationSelector @selectArea="onSelectArea" v-if="selectedPopup === 'station'" />
    <!-- <TimeFrameSelector @selectTime="onSelectTime" v-if="selectedPopup === 'time'" /> -->
    <div class="station-analysis-area">
        <div class="row space-btn">
            <div class="select-station row" @click="selectedPopup = 'station'">
                <p v-if="selectedStation === null"> Select Station</p>
                <p v-else>{{ selectedStation.name }}</p>
                <i class="fa fa-chevron-down"></i>
            </div>
            <!-- <div class="select-station row" @click="selectedPopup = 'time'">
                <p v-if="selectedStartDate === null">Select Timeframe</p>
                <p v-else>{{ formatDateRange }} </p>
                <i class="fa fa-chevron-down"></i>
            </div> -->
        </div>
        <div class="parent-container">

            <div class="selected-station-trend" v-if="selectedStation != null">
                <div class="column">
                    <StationTimeTrend :station="selectedStation" :start_date="selectedStartDate" :end_date="selectedEndDate"/>
                    <IndividualCrimeTrend :station="selectedStation" :start_date="selectedStartDate" :end_date="selectedEndDate"/>
                </div>
            
            </div>
            <div class="no-station-error" v-else>
                <p class="error"> No Station Currently Selected</p>
            </div>
        </div>
    </div>
</template>

<script>
import StationSelector from './StationSelector.vue'
// import TimeFrameSelector from './TimeFrameSelector.vue'
import StationTimeTrend from './StationTimeTrend.vue'
import IndividualCrimeTrend from './IndividualCrimeTrend.vue'
export default {

    name: 'station-time',
    components: {
        StationSelector,
        // TimeFrameSelector,
        StationTimeTrend,
        IndividualCrimeTrend
    },

    data() {
        return {
            selectedStation: null,
            selectedStartDate: null,
            selectedEndDate: null,
            selectedPopup: ""
        }
    },
    computed:{
        formatDateRange(){
            return `${this.selectedStartDate} - ${this.selectedEndDate}`
        }
    },
    watch: {

        
    },
    methods: {
        onSelectArea(e) {
            this.selectedStation = e
            this.selectedPopup = ""
        },
        onSelectTime(start,end) {
            this.selectedStartDate=start
            this.selectedEndDate = end
            this.selectedPopup = ""
        }
    }


}
</script>