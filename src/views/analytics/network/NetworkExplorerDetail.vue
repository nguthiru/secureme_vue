<template>
    <div class="network-explorer-detail">
        <div ref="networkContainer" class="network-container">
            <div id="criminal-map">

            </div>

        </div>
        <div class="accomplices-container row">
            <div class="accomplice-card card" :class="{'accomplice-card-active':this.selectedCriminal===accomplice}" v-for="accomplice in accomplices" :key="accomplice.criminal.id"
                @click="selectedCriminal = accomplice">
                <div class="accomplice-details">
                    <div class="row">
                        <img :src="accomplice.criminal.imageUrl" alt="" class="profile-photo smaller">
                        <p class="accomplice-name">{{ accomplice.criminal.name }}</p>
                    </div>
                </div>
                <div class="accomplice-crime">
                    <div class="accomplice-crime-card card" v-for="crime in accomplice.crimes" :key="crime.id">
                        {{ crime.name }}
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import mapboxGl from "mapbox-gl";
export default {
    props: {
        id: {
            required: true
        }
    },
    computed: {

    },

    data() {
        return {
            map: null,
            accomplices: [],
            selectedCriminal: null,
            accessToken: "pk.eyJ1Ijoibmd1dGhpcnUiLCJhIjoiY2xmcXplN3BjMDNobDNxcGI0YzZ2ZzVieiJ9.VyLzRhTHhjlsgQ32sAZlXw",


        }
    },
    watch: {

        selectedCriminal(newVal) {
            if (newVal != null) {
                this.getCriminalLocations()
            }
        }

    },
    methods: {
        async getAccomplices(id) {
            var res = await this.$axios.get(`analytics/criminal/accomplice/${id}`)


            this.accomplices = res.data
            if (this.accomplices.length > 0) {

                this.selectedCriminal = this.accomplices[0]
            }

        },

        getCriminalLocations() {

            this.$axios.get(`analytics/criminal/arrests/location/${this.selectedCriminal.criminal.idNumber}/`,).then(res => {
                console.log(res)
                let markers = res.data

                markers.forEach(marker => {
                    this.renderMarkers(marker.longitude, marker.latitude, marker.name)
                }) 
                if (markers.length > 0) {

                    this.map.flyTo({
                        center: [markers[0].longitude, markers[0].latitude]
                    })

                }

            })
        },

        renderMarkers(lng, lat, name) {
            new mapboxGl.Marker().setLngLat([lng, lat]).setPopup(new mapboxgl.Popup().setHTML(`<h3>${name}</h3>`)).addTo(this.map)

        }
    },
    mounted() {

        this.getAccomplices(this.id)
        mapboxgl.accessToken = this.accessToken;

        var map = new mapboxgl.Map({
            container: 'criminal-map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [36.8219, -1.2921],
            zoom: 10,
            maxBounds: [
                [33.5019, -4.6769], // Southwest coordinates of Kenya
                [41.8996, 5.0336]
            ],
        });
        this.map = map





    },
}
</script>