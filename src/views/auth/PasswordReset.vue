<template>
    <div class="auth-container">
        <div class="form-header">
            <h3 class="form-header-title">
                Reset Password
            </h3>
        </div>

        <div class="form-container" :class="{form_error:!isPassword1Valid}">
            <label for="label">New Password</label>
            <input type="password" v-model="password1" placeholder="8 characters or more">
            <p class="form-error" v-if="!isPassword1Valid">Password should be 8 characters or more </p>
        </div>
        <div class="form-container" :class="{form_error:!isPassword2Valid}">
            <label for="label">Confirm Password</label>
            <input type="password" v-model="password2" placeholder="">
            <p class="form-error" v-if="!isPassword2Valid">Passwords do not match</p>
        </div>

        <div class="form-container">

            <button type="submit" @click="resetPass">
                <LoadingButton :load="loading">
                    Reset Password
                </LoadingButton>
            </button>

        </div>
    </div>
</template>

<script>
import { useToast,} from 'vue-toastification'

var toast = useToast();
export default {
    name: 'password-reset',
    data() {
        return {
            'password1': null,
            'password2': null,
            loading: false,
            auth_error: null,
        }
    },

    computed: {
        isPassword1Valid() {
            if(this.password1==null){
                return true;
            }
            return this.password1.length >= 8;
        },
        isPassword2Valid() {
            if(this.password2==null){
                return true;
            }
            return this.password2 === this.password1;
        }
    },
    methods: {
        resetPass() {
            if(this.isPassword1Valid() && this.isPassword2Valid){

            
            let formData = new FormData()
            formData.append('password1', this.password1)
            formData.append('password2', this.password2)
            this.loading = true;
            this.$axios.post(`auth/password/reset/${this.$route.params.token}/`, formData).then(() => {
                this.loading = false;
                toast.success("Password reset successful");
                this.$router.push({ name: "login" })
            }).catch(e => {
                this.loading = false;
                if(e.response){
                    this.auth_error = e.response.data.error;
                    toast.error(e.response.data.error);
                }
                else{
                    this.auth_error="Something went wrong";
                    toast.error("Something went wrong")
                }
            })
        }}
    }
}
</script>