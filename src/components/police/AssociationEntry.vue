<template>
    <div class="data_entry_card card">
        <div class="data_entry_header">
            <div class="progress-indicator" style="width:650px">

            </div>
            <div class="header-content">
                <div class="row back-btn" @click="$router.back()">
                    <i class="fa fa-chevron-left"></i>
                    <p>Back</p>
                </div>
                <h4>Set Criminal Associations</h4>
                <div class="criminal_preview">

                    <div class="row">
                        <img v-if="getCriminal" :src="getCriminal.imageUrl" alt="Profile_Image" class="profile-photo small"
                            @change="pictureChange">
                        <h5>{{ getCriminal.name }}</h5>
                    </div>
                    <div class="flex-wrap">
                        <div class="card crime-card-simple" v-for="crime in getCrime.attached_crimes" :key="crime.id">
                            {{ crime.name }}

                        </div>
                    </div>
                </div>

                <div class="crime_preview">

                </div>
            </div>
        </div>
        <div class="data_entry_body">

            <div class="container">

                <p class="label">Accomplice </p>
                <div class="flex-wrap" id="crime_nature_container">
                    <div class="crime-card card fit-content default-padding" v-for="accomplice in accomplices"
                        :key="accomplice.id">
                        {{ accomplice.name }}

                        <div class="crime-card-detach">
                            <div class="row" @click="detachAccomplice">
                                <div class="small-icon">
                                    <i class="fa fa-times" style="margin-left: 1em; cursor: pointer;"></i>
                                </div>
                                Detach
                            </div>
                        </div>
                    </div>
                    <div class="row text-btn-container" @click="asideContent = 'accomplice'">
                        <i class="fa fa-plus"></i>
                        <button class="text-btn">Attach Accomplice</button>
                    </div>
                </div>
            </div>




        </div>

        <div class="data_entry_footer">
            <button class="primary-btn" @click="next">
                <p>View Summary</p>
            </button>
        </div>

    </div>

    <Teleport to="#police_aside" v-if="asideContent === 'accomplice'">
        <AccompliceSelector @attachAccomplice="attachAccomplice" :accomplices="accomplices"
            @detachAccomplice="detachAccomplice" />
    </Teleport>
    <!-- <Teleport to="#police_aside" v-if="asideContent === 'victim'">
        <VictimSelector @victimAttach="victim" />
    </Teleport> -->
</template>

<script>
import { mapGetters } from 'vuex'
import AccompliceSelector from './AccompliceSelector.vue'
// import VictimSelector from './VictimSelector.vue'
export default {
    components: {
        AccompliceSelector,
    },

    data() {
        return {

            asideContent: null,
            victims: [],
            accomplices: []
        }
    },
    computed: {
        ...mapGetters("police", ['getCriminal', 'getCrime']),
        crimesCharged() {
            return this.getCrime.attached_crimes.map(e => e.name).join(", ")
        },

    },
    methods: {
        next() {
            let association_data = {
                accomplices: this.accomplices
            }
            this.$store.dispatch('police/setAssociation',association_data)
            this.$emit('next')
        },
        attachFields() {
            // let accomplices_json = localStorage.getItem('accomplices')
            // if(accomplices_json!=null){
            //     this.accomplices = JSON.parse(accomplices_json)
            // }
            // else{
            //     this.accomplices=[]
            // }
        },
        attachAccomplice(accomplice) {
            this.accomplices.push(accomplice)

        },
        detachAccomplice(e) {
            this.accomplices = this.accomplices.filter(a => a.id != e.id)
        }

    },

    mounted() {
        this.attachFields()
    }
}
</script>