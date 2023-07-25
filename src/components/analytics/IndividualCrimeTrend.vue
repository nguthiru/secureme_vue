<template>
    <div class="column">
        <Bar :data="chartData"/>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {

    props: ['station', 'start_date', 'end_date'],
    computed: {

        getLabels(){
            if(this.crime_res!=null){
                return this.crime_res.map((e)=>{
                    return e.crime_name
                })
            }
            return []
        },
        getDataset(){
            if(this.crime_res!=null){
                return this.crime_res.map(e=>e.crime_count)
            }
            return []
        },
        chartData() {
            return {
                //sample bar graph data crime type vs number
                labels:this.getLabels,
                datasets: [{
                    label:"Type of crime",
                    data: this.getDataset,
                    backgroundColor: "#80080"
                }]
            }
        }
    },
    watch:{
        station(newVal){
            console.log("stationnn")
            if(newVal!=null){
                this.getData()
            }
        }
    },
    data(){
        return {
            crime_res:null
        }
    },
    components: {
        Bar
    },


    methods: {
        getData() {
            this.$axios.get(`analytics/crime/station/trend/${this.$props.station.id}/individual`).then(res=>{
                console.log(res)
                this.crime_res = res.data
            })
        }
    },
    mounted(){
        this.getData()
    }

}
</script>