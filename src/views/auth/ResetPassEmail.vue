<template>
    <div class="auth-container">
        <div class="form-header">
            <h3>Reset Password</h3>

            <p>Enter your accounts email address</p>
        </div>
        <div v-if="auth_error != null" class="auth-info-container auth-error row">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>

            <p>{{ auth_error }}</p>
        </div>

        <div v-if="login_successful" class="auth-info-container auth-success">
            <i class="fa fa-check" aria hidden="true"></i>
            <p>Proceed to code verification.</p>
        </div>
        <div class="form-container" :class="{ form_error: !isEmailValid }">
            <label for="label">Email Address</label>
            <input type="email" v-model="email">
            <p class="form-error" v-if="!isEmailValid">Enter a valid email address </p>
        </div>

        <div class="form-container">

            <button type="submit" @click="sendPasswordResetEmail">
                <LoadingButton :load="loading">
                    <div class="row fit-content margin-auto">
                        <i class="fas fa-envelope"></i>
                        <p>Send Reset Email</p>
                    </div>
                </LoadingButton>
            </button>

        </div>

        <div class="form-footer">
            <p> Go Back. <router-link :to="{ name: 'login' }" class="underline-link" replace>Login</router-link></p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import { useToast,} from 'vue-toastification'

var toast = useToast();
export default {

    data() {
        return {
            email: null,
            auth_error: null,
            loading: false,
        }
    },

    computed: {
        isEmailValid() {
            if (this.email != null) {

                // Email validation regular expression pattern
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(this.email);
            }
            return true
        },
    },
    methods: {
        ...mapActions(['saveEmail']),
        sendPasswordResetEmail() {
            if (this.email != null && this.isEmailValid()) {


                let formData = new FormData()
                formData.append('email', this.email)
                this.loading = true;
                this.$axios.post('auth/password/reset/email/', formData).then(res => {
                    this.saveEmail(res.data.email)
                    this.loading = false;
                    toast.success("Password reset code has been sent to your email");
                    this.$router.push({ name: "password_reset_code" })

                }).catch(e => {
                    this.loading = false;
                    if (e.response) {
                        this.auth_error = e.response.data.error
                    }
                    else {
                        this.auth_error = "An error occured"
                    }
                })
            }
        }
    }
}
</script>