<template>
    <div class="auth-container" id="verify-email-auth-container">
        <div class="form-header">
            <p>We sent you a code to the email provided: <span class="secondary-color">{{ email }}</span></p>
        </div>
        <div v-if="code_error != null" class="auth-info-container auth-error row">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>

            <p>{{ code_error }}</p>
        </div>

        <div v-if="success_message" class="auth-info-container auth-success">
            <i class="fa fa-check" aria hidden="true"></i>
            <p>{{success_message}}</p>
        </div>
        <div class="form-container">
            <PincodeInput v-model="code" :digits="7"/>
            <p class="form-error">{{ code_error }}</p>
        </div>

        <div class="form-container">
            <button type="submit" id="verify-email-button" @click="activate">
                <LoadingButton :loading="loading">

                    Activate Account
                </LoadingButton>
            </button>
        </div>
        <div class="form-footer">
            <p>Didn't receive the code? <a class="underline-link" @click="resendEmail">Resend Email</a></p>
        </div>

    </div>
</template>

<script>
import PincodeInput from 'vue3-pincode-input';
import LoadingButton from '@/components/LoadingButton.vue'
import { mapState} from 'vuex';
import { useToast,} from 'vue-toastification'

var toast = useToast();
export default {
    name: 'verify-email',
    components: {
        PincodeInput,
        LoadingButton
    },
    data() {
        return {
            'code_length': 7,
            'code': null,
            'code_error': null,
            'loading': false,
            'successful': false,
            'success_message': null
        }

    },
    computed:{
        ...mapState(['email'])
    },
    methods: {
        isValid() {
            if (this.code.length < this.code_length) {
                this.code_error = 'Code is too short'
                return false
            }
            else if (this.code.length > this.code_length) {
                this.code_error = 'Code is too long'
                return false
            }
            else {
                this.code_error = null
                return true
            }

        },

        activate() {
            
            if (this.isValid()) {
                this.loading = true;
                var formData = new FormData();
                formData.append('code', this.code);
                formData.append('email', this.email);

                this.$axios.post('auth/activate/email/', formData).then(() => { 
                
                    this.successful=true;
                    toast.success("Your account has been activated");
                    this.loading = false;
                    this.$router.replace({name:'login'})
                }).catch(e => { console.log(e);
                    if(e.response){
                        this.code_error = e.response.data.error;
                    }
                    else{
                        this.code_error = 'An error occured. Please try again.'
                    }
                    
                    })
            }
        },

        resendEmail(){
            var formData = new FormData();
            formData.append('email',this.email);

            this.$axios.post('auth/activate/email/resend/',formData).then(() => {
                this.success_message="Activation code has been sent to your email";
            }).catch(e => {
                if(e.response){
                    this.code_error = e.response.data.error;
                }
                else{
                    this.code_error = 'An error occured. Please try again.'
                }
            })
        }
    }
}
</script>