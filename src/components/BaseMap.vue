<template>
    <div :id="mapId" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { mapGetters } from "vuex";

export default {
    name: "BaseMap",
    data() {
        return {
            accessToken: "pk.eyJ1Ijoibmd1dGhpcnUiLCJhIjoiY2xmcXplN3BjMDNobDNxcGI0YzZ2ZzVieiJ9.VyLzRhTHhjlsgQ32sAZlXw",
            map: null
        }
    },

    props: {
        markers: {

        },
        mapId: {
            default: 'mapContainer'
        }
    },
    computed: {
        ...mapGetters('analysis', ['getHotspots'])
    },
    watch: {
        getHotspots(newVal) {
            if (newVal != null) {
                this.updateHotspots()
            }
        },

        markers(newVal) {
            if (newVal != null) {
                this.addMarkers()
            }
        }

    },
    methods: {
        updateHotspots() {
            this.map.on('load', () => {
                this.addHotspots()
            })

            // this.map.on("onSourceAdded", () => {


            //         console.log("HEYY")
            //         this.map.getSource('hotspots').setData(this.createGeoJSON())

            // })




        },

        createGeoJSON() {
            let _hotspots = this.getHotspots;


            const hotspots = _hotspots.map(hotspot => {
                return {
                    name: hotspot.name,
                    lat: hotspot.latitude,
                    lng: hotspot.longitude,
                };
            });

            const heatmapData = hotspots.map(hotspot => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [hotspot.lng, hotspot.lat]
                    },
                    properties: {}
                };
            });

            return heatmapData
        },

        addHotspots() {



            this.map.addSource("hotspots", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: this.createGeoJSON()
                }
            });

            this.map.addLayer({
                id: "hotspot-density",
                type: "heatmap",
                source: "hotspots",
                maxzoom: 15,
                paint: {
                    'heatmap-weight': {
                        property: 'num_criminals',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [62, 1]
                        ]
                    },
                    "heatmap-intensity": {
                        stops: [
                            [0, 1],
                            [15, 3]
                        ],
                        base: 2
                    },
                    "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0,
                        "rgba(0, 0, 255, 0)",
                        0.2,
                        "rgb(0, 0, 255)",
                        0.4,
                        "rgb(0, 255, 0)",
                        0.6,
                        "rgb(255, 255, 0)",
                        0.8,
                        "rgb(255, 165, 0)",
                        1,
                        "rgb(255, 0, 0)"
                    ],
                    "heatmap-opacity": 0.75
                }
            });



        },

        onPolygonDraw(e) {
            const polygon = e.features[0].geometry.coordinates[0];
            const polygonPoints = polygon.map(point => {
                return {
                    lng: point[0],
                    lat: point[1],
                };
            });

            this.$emit('polygonDraw', polygonPoints)
        }



    },
    mounted() {
        mapboxgl.accessToken = this.accessToken;

        this.map = new mapboxgl.Map({
            container: this.$props.mapId,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [36.8219, -1.2921],
            zoom: 6,
            maxBounds: [
                [33.5019, -4.6769], // Southwest coordinates of Kenya
                [41.8996, 5.0336]
            ],
        });
        var Draw = new MapboxDraw(
            {
                displayControlsDefault: false,
                // Select which mapbox-gl-draw control buttons to add to the map.
                controls: {
                    polygon: true,
                    trash: true
                },
                // Set mapbox-gl-draw to draw by default.
                // The user does not have to click the polygon control button first.
                defaultMode: 'draw_polygon'
            }
        );
        this.map.addControl(Draw, 'bottom-right');
        this.map.on('draw.modechange', e => {
            if (e.mode === 'draw_polygon') {
                this.map.dragPan.disable();
            } else {
                this.map.dragPan.enable();
            }
        });

        this.map.on('draw.create', this.onPolygonDraw)

        // this.addHeatmap();
    },
}
</script>