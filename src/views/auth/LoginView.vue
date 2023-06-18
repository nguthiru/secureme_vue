<template>
    <div class="auth-container">
        <div class="row form-header">
            <img src="" alt="" class="form-logo">
            <h2 class="">Login</h2>
        </div>

        <FormInput v-model="email" label="Email Address"  :error="email_error" type="email" />

        <FormInput v-model="password" label="Password" placeholder="8 characters or more" :password="password_error" type="password" />

        <div class="form-container">
            <button type="submit" @click="login">Login</button>
        </div>

        <div class="form-footer">
            <p>Don't have an account? <router-link :to="{ name: 'register' }">Register</router-link></p>
        </div>
    </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue'
export default {

    name: 'LoginVue',
    components: {
        FormInput
    },
    data() {
        return {
            'email': null,
            'password': null,
            'email_error': null,
            'password_error': null
        }
    },

    methods: {
        isValid() {
            if (this.email == null) {
                this.email_error = "Email is required"
                return false
            }
            if (this.password == null) {
                this.password_error = "Password is required"
                return false
            }
            return true
        },
        login() {
            
                var data = new FormData();
                data.append('username', this.email);
                data.append('password', this.password);
                this.$axios.post('auth/login/', data).then((res) => {
                    console.log(res)
                    this.$toast.open("Login Successful")
                }).catch((e) => this.$toast.open(e))
            
        }
    }
}

</script>
