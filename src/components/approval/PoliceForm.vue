<template>
    <p class="form-error" v-if="form_error">{{ form_error }}</p>
    <div class="form-container">

        <label for="Station">PoliceID</label>
        <input type="number" v-model="police_id">

    </div>
    <div class="form-container">

        <label for="Station">Station</label>
        <select name="" id="Station" v-model="selected_station">
            <option v-for="station in stations" :value="station.id" :key="station.id">{{ station.name }}</option>

        </select>
    </div>
    <div class="form-container">
        <button class="primary-btn" @click="submitRequest">Submit Request</button>
    </div>
</template>
<script>
import { useToast,} from 'vue-toastification'

var toast = useToast()
export default {
    name: 'PoliceApprovalForm',

    data() {
        return {
            police_id: null,
            selected_station: null,
            form_error: null,

            stations: [
                {
                    "id": 1,
                    "name": "Langata"
                },
                {
                    "id": 2,
                    "name": "Kibera"
                },
            ]
        }
    },
    methods: {
        getAllStations() {
            this.$axios.get('police/stations/').then(res => {
                this.stations = res.data;
            }).catch(() => {
                console.log("An error has occured")
            })
        },
        validateForm() {
            if (this.police_id === null || this.police_id === "" || this.selected_station == null) {
                this.form_error = "Fill in all fields."
                return false
            }
            return true
        },
        submitRequest() {
            
            if (this.validateForm()) {


                let formData = new FormData();
                formData.append('police_id', this.police_id);
                formData.append('station', this.selected_station)
                formData.append('user_type','P')
                this.$axios.post('auth/approval-request/', formData).then(() => {
                    toast.success("Approval Request sent you will be notified once it is approved")
                    this.$router.push({ name: 'dashboard' })
                }).catch((err) => {
                    if(err.response)
                    toast.error(err.response.data.error)
                    
                })
            }
        }
    },
    mounted() {
        this.getAllStations()
    }
}
</script>