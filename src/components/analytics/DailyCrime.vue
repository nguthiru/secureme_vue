<template>
    <Radar :data="chartData" />
</template>

<script>
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, RadialLinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, RadialLinearScale)


export default {

    props: ['crime'],
    watch: {
        crime(newVal) {
            if (newVal != null) {
                this.getData()
            }

        }
    },
    computed: {

        getLabels() {
            if (this.crime_res != null) {
                return this.crime_res.map(e => {

                    return e.hour
                })
            }
            return []
        },
        getDataset() {
            if (this.crime_res != null) {
                return this.crime_res.map(e => {
                    return e.crime_count
                })
            }
            return []
        },
        chartData() {

            return {
                labels: this.getLabels,
                datasets: [
                    {
                        label: this.$props.crime.name,
                        data: this.getDataset,
                        backgroundColor: "#de1a1a",
                        borderColor: "#de1a1a"
                    }
                ]

            }
        }
    },
    components: {
        Radar
    },
    data() {
        return {
            crime_res: null
        }
    },
    methods: {
        getData() {
            this.$axios.get(`analytics/crime/daily/trend/${this.$props.crime.id}/`,).then(res => {
                this.crime_res = res.data
            })
        }
    },
    mounted() {
        this.getData()
    }

}
</script>