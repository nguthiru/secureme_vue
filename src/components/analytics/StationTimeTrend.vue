<template>
    <div class="container">

        <p class="chart-subtitle">
            <!-- Total Crime Count: 54 -->
        </p>
        <Line :data="chartData" :options="chartOptions" id="smallTotalChart" />
    </div>
</template>
<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
    props: ['station', 'start_date', 'end_date'],
    components: {
        Line
    },
    watch: {
        station(newVal, oldVal) {
            console.log("OLL")
            if (newVal != oldVal) {
                this.getStationData()
            }
        },
        start_date(newVal, oldVal) {
            if (newVal != oldVal) {
                this.getStationData()
            }

        },
        end_date(newVal, oldVal) {
            if (newVal != oldVal) {
                this.getStationData()
            }

        }
    },
    computed: {
        getLabels(){
            if(this.crime_res!=null){
                return this.crime_res.map((e)=>{
                    return e.month
                })
            }
            return []
        },
        getDatasets() {
            if (this.crime_res != null) {

                return [{
                    label:"Yearly Trend",
                    data: this.crime_res.map((e) => {
                        return e.total_crime_count
                    }),
                    borderColor: "#800080"
                }]
            }
            else {
                return []
            }
        },
        chartData() {
            return {


                labels: this.getLabels,
                datasets: this.getDatasets
            }
        }
    },
    data() {
        return {
            crime_res: null,
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
                            fontColor: '#666',
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
                            fontColor: '#666',
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

    methods: {
        getStationData() {
            this.$axios.get(`analytics/crime/station/trend/${this.station.id}/total/`, {
                params: {
                    start_date: this.$props.start_date,
                    end_date: this.$props.end_date,
                }
            }).then(res => {
                this.crime_res = res.data
            }).catch(e => {
                console.log(e)
            })

        },
        generateRandomColor() {
            // Generate random values for red, green, and blue channels
            var red = Math.floor(Math.random() * 256);
            var green = Math.floor(Math.random() * 256);
            var blue = Math.floor(Math.random() * 256);

            // Convert the decimal values to hexadecimal strings
            var redHex = red.toString(16).padStart(2, '0');
            var greenHex = green.toString(16).padStart(2, '0');
            var blueHex = blue.toString(16).padStart(2, '0');

            // Combine the hexadecimal values to form the color code
            var colorCode = '#' + redHex + greenHex + blueHex;

            return colorCode;
        }

    },

    mounted() {
        this.getStationData()
    }
}

</script>