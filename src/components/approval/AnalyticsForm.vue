<template>
    <div class="form-container">

        <label for="Station">Work ID Number</label>
        <input type="number" v-model="work_id">

    </div>


    <div class="form-container">
        <button class="primary-btn" @click="submitRequest">Submit Request</button>
    </div>
</template>

<script>
import { useToast, } from 'vue-toastification'

var toast = useToast()
export default {
    name: 'AnalysisApprovalForm',

    data() {
        return {
            work_id: null
        }
    },
    methods: {
        validateForm() {
            if (this.work_id != null) {
                return true
            }
            return false
        },
        submitRequest() {
            if (this.validateForm()) {


                let formData = new FormData();
                formData.append('work_id', this.police_id);
                formData.append('user_type', 'A')
                this.$axios.post('auth/approval-request/', formData).then(() => {
                    toast.success("Approval Request sent you will be notified once it is approved")
                    this.$router.push({ name: 'dashboard' })
                }).catch((err) => {
                    if (err.response)
                        toast.error(err.response.data.error)

                })
            }
        }
    }
}
</script>