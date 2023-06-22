<template>
    <div class="auth-container" id="register-auth-container">
        <div class="form-header">
            <div class="icon-container">
                <i class="fas fa-user icon"></i>
            </div>
            <h3 class="form-header-title">Create an account</h3>
        </div>

        <div v-if="auth_error != null" class="auth-info-container auth-error row">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>

            <p>{{ auth_error }} <span class="underline-link" v-if="isErrorVerification"
                    @click="resend_verification_email">Resend Verification Email</span> </p>
        </div>

        <div v-if="login_successful" class="auth-info-container auth-success">
            <i class="fa fa-check" aria hidden="true"></i>
            <p>Account creation successful. Verify account</p>
        </div>
        
        <div class="form-container" :class="{ form_error: user }">
            <label for="label">Email Address</label>
            <input type="email" v-model="email">
            <p class="form-error" v-if="!isEmailValid">Enter a valid email address </p>
            <p class="form-error" v-if="email_error">{{ email_error }} </p>
        </div>
        <div class="form-container" :class="{ form_error: !isPasswordValid }">
            <label for="label">Password</label>
            <input type="password" v-model="password1" placeholder="Should be 8 characters or more">
            <p class="form-error" v-if="!isPasswordValid">Password should be 8 characters or more</p>
            <p class="form-error" v-if="password1_error != null || password1_error === ''">{{ password1_error }}</p>
        </div>
        <div class="form-container" :class="{ form_error: password1 !== password2 }">
            <label for="label">Confirm Password</label>
            <input type="password" v-model="password2">
            <p class="form-error" v-if="password1 !== password2">Passwords do not match</p>
        </div>


        <div class="form-container">

            <button type="submit" @click="register">
                <LoadingButton :load="loading">
                    Register
                </LoadingButton>
            </button>

        </div>

        <div class="form-footer">
            <p>Have an account? <router-link :to="{ name: 'login' }">Login</router-link></p>
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
            'username': null,
            'password1': null,
            'password2': null,
            'email_error': null,
            'password1_error': null,
            'username_error': null,
            'password2_error': null,
            'auth_error': null,
            'loading': false,
            'login_successful': false
        }
    },
    computed: {
        isEmailValid() {
            if(this.email==null){
                return true;
            }
            // Email validation regular expression pattern
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(this.email);
        },
        isPasswordValid() {
            if (this.password1 != null && this.password1.length >= 8) {
                return true
            }
            return false
        },
        isUsernameValid() {
            if (this.username != null || this.username !== '') {
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
                else if (this.password1 == null || this.password1 === "") {
                    this.password1_error = "This field is required";

                }
                else if (this.password2 == null || this.password2 === "") {
                    this.password2_error = "This field is required";

                }
                else if (this.password1 === this.password2) {
                    this.password2_error === "Passwords do not match"
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

        register() {
            let form_valid = this.validate()
            if (form_valid) {
                var data = new FormData();
                data.append('email', this.email);
                data.append('password2', this.password2);
                data.append('password1', this.password1);
                try {
                    this.setLoading()
                    this.$axios.post('auth/register/', data).then(() => {
                        this.login_successful = true
                        this.saveEmail(this.email)
                        this.setLoading()
                        toast.success("Account creation successful. Verify account")
                        this.$router.replace({ 'name': 'verify_email', })
                    }).catch(e => {
                        this.setLoading();
                        if (e.response) {
                            this.auth_error = e.response.data.error
                        }
                        else {
                            this.auth_error = "Something went wrong"
                        }
                    });
                }
                catch (error) {
                    console.log(error)

                }


            }

        }
    }
}  
</script>
