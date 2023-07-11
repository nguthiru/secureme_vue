<template>
    <div class="data_entry_card card">
        <div class="data_entry_header">
            <div class="progress-indicator" style="width:500px">

            </div>
            <div class="header-content">
                <div class="row back-btn" @click="$router.back()">
                    <i class="fa fa-chevron-left"></i>
                    <p>Back</p>
                </div>
                <div class="criminal_preview">
                    <div class="row">
                        <img v-if="getCriminal" :src="getCriminal.imageUrl" alt="Profile_Image" class="profile-photo small"
                            @change="pictureChange">
                        <h5>{{ getCriminal.name}}</h5>
                    </div>
                </div>
                <h4>Crime Details</h4>
            </div>
        </div>
        <div class="data_entry_body">
            <p class="label">Nature of Crime </p>
            <div class="flex-wrap" id="crime_nature_container">
                <CrimeCard v-for="crime in attachedCrimes" :key="crime.id" :crime="crime" @detachCrime="crimeDetach"/>

                <div class="row text-btn-container" @click="showAside = true">
                    <i class="fa fa-plus"></i>
                    <button class="text-btn">Attach Crime</button>
                </div>
            </div>
            <div class="row space-btn">

                <div class="form-container">
                    <label for="Time">Time of Occurence</label>
                    <input type="datetime-local" v-model="time">
                </div>
                <div class="row">
                    <div class="form-container">
                        <label for="Fatalities">Number Of Fatalities (If Any)</label>
                        <input type="number" v-model="fatalities">
                    </div>
                </div>
            </div>


        </div>

        <div class="data_entry_footer">
            <button class="primary-btn" @click="next">
                <p>Next</p>
            </button>
        </div>

    </div>

    <Teleport to="#police_aside" v-if="showAside">
        <CrimeSelector @crimeAttach="crimeAttach" />
    </Teleport>
</template>

<script>
import CrimeSelector from './CrimeSelector.vue'
import CrimeCard from './CrimeCard.vue'
import { useToast, } from 'vue-toastification'
import { mapGetters } from 'vuex';

var toast = useToast();

export default {
    components: {
        CrimeSelector, CrimeCard
    },

    data() {
        return {
         
            showAside: false,
            attachedCrimes: [],
            time: null,
            fatalities: null,
        }
    },
    computed: {
        ...mapGetters("police",['getCriminal','getCrime']),
        // getImageUrl() {
        //     if (this.preview_image != null) {
        //         return this.preview_image
        //     }
        //     return "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
        // }
    },
    methods: {
        //isValid method ensuring atleast there is an element in attachedCrimes and the rest are not null or ""
        isValid() {
            if (this.attachedCrimes.length == 0) {
                toast.warning("Attach atleast one crime")
                return false
            }
            if (this.time == null || this.time === "") {
                toast.warning("Enter time of occurence")
                return false
            }
            if (this.fatalities == null || this.fatalities === "") {
                toast.warning("Enter number of fatalities")
                return false
            }
            return true
        },

        next() {
            if (this.isValid()) {
                //save everything to localstorage and jsonify the attached crimes
                let crime_data = {
                    attached_crimes: this.attachedCrimes,
                    time: this.time,
                    fatalities: this.fatalities
                }
                this.$store.dispatch('police/setCrime',crime_data)
                this.$emit('next')
            }
        },

        crimeAttach(crime) {

            if (this.attachedCrimes.length!=0 && this.attachedCrimes.find(c => c.id == crime.id)) {
                toast.warning("Crime has already been attached")
            }
            else {

                this.attachedCrimes.push(crime)
            }
        },

        crimeDetach(crime){
            this.attachedCrimes = this.attachedCrimes.filter(c=>c.id!=crime.id)
        },
        
        pictureChange() {
            // console.log("HELLO")
            // // upload image
            // const image = e.target.files[0];
            // const reader = new FileReader();
            // reader.readAsDataURL(image);
            // reader.onload = e => {
            //     this.previewImage = e.target.result;
            //     console.log(this.previewImage);
            // };
        },

        assignFields() {
            if(this.getCrime!=null){
                let crime = this.getCrime
                this.attachedCrimes = crime.attached_crimes
                this.time = crime.time
                this.fatalities = crime.fatalities
            }
            
            // let attached_crimes_json = localStorage.getItem('attached_crimes')
            // if(attached_crimes_json===null || attached_crimes_json===undefined){
            //     attached_crimes_json="[]"
            // }
            // this.attachedCrimes = JSON.parse(attached_crimes_json)
            // this.time = localStorage.getItem('crime_time')
            // this.fatalities = localStorage.getItem('crime_fatalities')
        }

    },
    mounted() {
        this.assignFields()
    }
}
</script>