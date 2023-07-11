<template>
    <div class="data_entry_card card">
        <div class="data_entry_header">
            <div class="progress-indicator" style="width:750px">

            </div>
            <div class="header-content">
                <div class="row back-btn" @click="$router.back()">
                    <i class="fa fa-chevron-left"></i>
                    <p>Back</p>
                </div>
                <h4>Summary</h4>
            </div>
        </div>
        <div class="data_entry_body">
            <div class="crime-details-container">
                <h4>Criminal Details</h4>

                <div class="flex-wrap space-btn">
                    <div class="column">
                        <p class="detail_label">ID Number</p>
                        <p class="detail_content">{{ getCriminal.idNumber }}</p>

                    </div>
                    <div class="column">
                        <p class="detail_label">Name</p>
                        <p class="detail_content">{{ getCriminal.name }}</p>

                    </div>
                    <div class="column">
                        <p class="detail_label">Date Of Birth</p>
                        <p class="detail_content">{{ getCriminal.dateOfBirth }}</p>

                    </div>
                    <div class="column">
                        <p class="detail_label">Height</p>
                        <p class="detail_content">{{ getCriminal.height }}</p>

                    </div>
                </div>
            </div>

            <div class="crime-details-container">

                <h4>Crime Details</h4>
                <div class="column">
                    <p class="detail_label">Crime Nature</p>
                    <div class="flex-wrap">
                        <div class="card crime-card-simple" v-for="crime in getCrime.attached_crimes" :key="crime.id">
                            {{ crime.name }}

                        </div>
                    </div>
                </div>

                <div class="flex-wrap">
                    <div class="column">
                        <p class="detail_label">Time of crime</p>
                        <p class="detail_content">{{ getCrime.time }}</p>
                    </div>
                    <div class="column">
                        <p class="detail_label">Fatalities</p>
                        <p class="detail_content">{{ getCrime.fatalities }}</p>
                    </div>
                </div>
            </div>

            <div class="crime-details-container">
                <h4>Accomplices</h4>
                <div class="flex-wrap">
                    <div class="row accomplice-card" v-for="accomplice in getAssociations.accomplices" :key="accomplice.id">
                        <img :src="accomplice.imageUrl" alt="" class="profile-photo small">
                        <p class="detail_content">{{ accomplice.name }}</p>
                    </div>
                </div>
            </div>



        </div>

        <div class="data_entry_footer">
            <button class="primary-btn" @click="pushCriminal">
                <div class="row">
                    <p>Push To SecureMe</p>
                </div>
            </button>
        </div>

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { useToast,} from 'vue-toastification'

var toast = useToast();
export default {

    computed: {
        ...mapGetters('police', ['getCrime', 'getCriminal', 'getAssociations', 'getCriminalExisted'])

    },


    methods: {

        pushCriminal() {
            this.$axios.post('police/criminal/add/', this.getCriminal).then(res => {
                this.getCrime.attached_crimes.forEach(crime => {

                    let crime_data = {
                        crimeID: crime.id,
                        criminalID: res.data.idNumber,
                        time: this.getCrime.time,
                        casualities: this.getCrime.fatalities
                    }

                    this.$axios.post('police/criminal/crime/connect/',crime_data).then(res => {
                        console.log(res.data)

                    }).catch(err => {
                        throw(err)
                    })

                })

                this.getAssociations.accomplices.forEach(accomplice => {
                    let accomplice_data = {
                        criminalID: this.getCriminal.idNumber,
                        accompliceID: accomplice.idNumber
                    }

                    this.$axios.post('police/criminal/accomplice/connect/',accomplice_data).then(res => {
                        console.log(res.data)

                    }).catch(err => {
                        throw(err)
                    })
                })

                toast.success("Criminal Uploaded Successfully")
                this.$router.push({name:'police_view'})

            }).catch(err => {
                console.log(err)
            })
        },

        submit() {
            //push_crime
            // if(!this.getCriminalExisted){
            //     this.pushCriminal()
            // }
        }
    }

}

</script>