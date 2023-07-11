<template>
    <div class="data_entry_card card">
        <div class="data_entry_header">
            <div class="progress-indicator" style="width:100px">

            </div>
            <div class="header-content">
                <h4>Connect a criminal</h4>
            </div>
        </div>
        <div class="data_entry_body">
            <div class="form-container">
                <label for="ID NUMBER">Enter Criminal ID Number</label>
                <input type="number" name="" id="id_input" v-model="id_num">
                <p class="form-error">{{ auth_error }}</p>
            </div>
        </div>

        <div class="data_entry_footer">
            <button class="primary-btn" @click="next">
                <p>Next (Criminal Details)</p>
            </button>
        </div>

    </div>
</template>

<script>
import { useToast, } from 'vue-toastification'

var toast = useToast();
export default {

    mounted() {
        this.id_num = localStorage.getItem('id_num')
    },
    methods: {
        isValid() {
            if (this.id_num != null && this.id_num !== "") {
                return true
            }
            this.auth_error = "This Field is Required"
            return false
        },

        next() {
            if (this.isValid()) {
                //Do something 
                this.$axios.get(`police/check_criminal/${this.id_num}/`).then(res => {
                    let criminal_data = res.data
                    this.$store.dispatch('police/setCriminal', criminal_data)
                    this.$store.dispatch('police/setCriminalExisted')
                    localStorage.setItem('id_num', this.id_num)
                    this.$router.push(`?page=3`)
                }).catch(err => {
                    if (err.response.status === 404) {
                        // toast.warning("Criminal not found. Add them")
                        localStorage.setItem('id_num', this.id_num)

                        this.$emit('next')
                    }
                    else {
                        toast.error("An error has occured")
                    }
                })
                //TODO: check whether criminal already exists if does skip
            }
        }
    },
    data() {
        return {
            id_num: null,
            auth_error: null
        }
    },

}
</script>