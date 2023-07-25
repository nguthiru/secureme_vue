<template>
    <Radar :data="chartData" :options="chartOptions"/>
</template>

<script>
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale)

export default {
    props: ['crime'],
    components: {
        Radar

    },
    watch:{
    crime(newVal){
        if(newVal!=null){
            this.getData()
        }

    }   
    },
    computed: {
        getLabels() {
            if (this.crime_res != null) {
                return this.crime_res.map(e => {

                    return e.day_of_week
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
        chartOptions() {
            return {
                chartOptions: {
                    responsive: true,
                    // maintainAspectRatio: false,
                    tension: 0.3,
                    legend: {
                        position: 'bottom',
                        labels: {
                            fontColor: '#333',
                            fontSize: 12,
                            padding: 20
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                color: '#eee',
                                lineWidth: 1
                            },
                            ticks: {
                                fontColor: '#fff',
                                fontSize: 12,
                                padding: 10
                            }
                        },
                        y: {
                            display: true,
                            grid: {
                                color: '#eee',
                                lineWidth: 1
                            },
                            ticks: {
                                fontColor: '#ff',
                                fontSize: 12,
                                padding: 10
                            }
                        }
                    },
                    tooltips: {
                        backgroundColor: '#333',
                        titleFontColor: '#fff',
                        bodyFontColor: '#fff',
                        displayColors: false,
                        cornerRadius: 4
                    }
                }
            }
        },
        chartData() {
            return {
                labels: this.getLabels,
                datasets: [
                    {
                        label: this.$props.crime.name,
                        data: this.getDataset,
                        backgroundColor: 'blue',
                        fill:true,
                        borderColor: 'blue',
                    }
                ]

            }
        }
    },
    data() {
        return {
            crime_res: null
        }
    },

    methods: {
        getData() {
            this.$axios.get(`analytics/crime/weekly/trend/${this.$props.crime.id}/`,).then(res => {
                console.log(res.data)
                this.crime_res = res.data
            })
        }
    },
    mounted() {
        this.getData();
    }

}
</script>