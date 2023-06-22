<template>
    <div class="auth-container">
        <div class="form-header">
            <div class="icon-container">
                <i class="fas fa-user icon"></i>
            </div>
            <h3 class="form-header-title">Welcome Back. Login</h3>
        </div>

        <div v-if="auth_error != null" class="auth-info-container auth-error row">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>

            <p>{{ auth_error }} <a class="underline-link" v-if="isErrorVerification" @click="resendVerificationEmail">Resend
                    Verification Email</a> </p>
        </div>

        <div v-if="login_successful" class="auth-info-container auth-success">
            <i class="fa fa-check" aria hidden="true"></i>
            <p>Login Successful redirecting</p>
        </div>
        <div class="form-container" :class="{ form_error: !isEmailValid }">
            <label for="label">Email Address</label>
            <input type="email" v-model="email">
            <p class="form-error" v-if="!isEmailValid">Enter a valid email address </p>
            <p class="form-error" v-if="email_error">{{ email_error }} </p>
        </div>
        <div class="form-container" :class="{ form_error: isPasswordError }">
            <label for="label">Password</label>
            <input type="password" v-model="password">
            <p class="form-error" v-if="password_error != null || password_error === ''">{{ password_error }}</p>
        </div>
        <div class="form-container">

            <p class="forgot-password-text">Forgot Password? <router-link :to="{ name: 'password_reset_email' }"
                    class="underline-link"> Reset Password </router-link></p>
        </div>

        <div class="form-container">

            <button type="submit" @click="login">
                <LoadingButton :load="loading">
                    Login
                </LoadingButton>
            </button>

        </div>

        <div class="form-footer">
            <p>Don't have an account? <router-link :to="{ name: 'register' }">Register</router-link></p>
        </div>
    </div>
</template>

<script>
import LoadingButton from '@/components/LoadingButton.vue'
import { mapActions } from 'vuex';

import { useToast,} from 'vue-toastification'

var toast = useToast();
export default {

    name: 'LoginVue',
    components: {
        LoadingButton
    },
    data() {
        return {
            'email': null,
            'password': null,
            'email_error': null,
            'password_error': null,
            'auth_error': null,
            'loading': false,
            'login_successful': false
        }
    },
    computed: {
        isEmailValid() {
            // Email validation regular expression pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(this.email);
        },
        isPasswordError() {
            if (this.password_error != null) {
                return true
            }
            return false
        },



        isErrorVerification() {
            if (this.auth_error == null) {
                return false
            }
            else if (this.auth_error === "Your email address is not verified.") {
                return true
            }

            return false
        }
    },

    methods: {
        ...mapActions(['saveEmail']),
        setLoading() {
            console.log(this.loading)
            this.loading = !this.loading;
        },
        validate() {
            this.clearErrors();

            if (this.isEmailValid && this.password !== "") {
                return true
            }
            else {
                if (this.isEmailValid === "") {
                    this.email_error = 'Enter a valid email address';

                }
                else if (this.password == null || this.password === "") {
                    console.log("Password field is empty")
                    this.password_error = "This field is required";

                }
                else {
                    this.email_error = 'Enter a valid email address';
                    this.password_error = 'This field is required';

                }

                return false;
            }
        },
        clearErrors() {
            this.auth_error = null;
            this.emailError = '';
            this.passwordError = '';
        },

        login() {
            let form_valid = this.validate()
            if (form_valid) {
                var data = new FormData();
                data.append('email', this.email);
                data.append('password', this.password);
                try {
                    this.setLoading()
                    this.$axios.post('auth/login/', data).then((response) => {
                        this.login_successful = true
                        localStorage.setItem('token',response.data.token)
                        toast.success("Login Successful");
                        this.$store.dispatch('populateUser').then(()=>{

                            this.$router.replace({'name':'dashboard'})
                        })
                        this.setLoading()
                    }).catch(e => {
                        this.setLoading()
                        if (e.response) {
                            this.auth_error = e.response.data.error
                        }
                        else {
                            console.log("CATCHING")
                            this.auth_error = "Something went wrong"
                        }
                    });
                }
                catch (error) {
                    console.log(error)
                    this.setLoading()

                }


            }


        },
        resendVerificationEmail() {
            var formData = new FormData();
            formData.append('email', this.email);
            this.saveEmail(this.email)
            this.loading = true;
            this.$axios.post('auth/activate/email/resend/', formData).then(() => {
                this.$router.push({ name: 'verify_email' })
                this.success_message = "Activation code has been sent to your email";
            }).catch(e => {
                if (e.response) {
                    this.auth_error = e.response.data.error;
                }
                else {
                    this.auth_error = 'An error occured. Please try again.'
                }
            })

            this.loading = false;
        }
    }
}  
</script>
