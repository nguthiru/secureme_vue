<template>

    <Teleport to="body">

        <div class="modal-container" @click="showModal=false" v-if="showModal">
            <div class="modal">
                <div class="modal-header">
                    <h4>Do You Want To Logout</h4>
                
                </div>

                <div class="modal-body">
                    <div id="modal-logout-buttons" class="row">

                        <button class="error-btn" type='button' @click="logout">Log Out</button>
                        <button class="text-btn primary-color" @click="showModal=false">Cancel</button>
                    </div>
                </div>

                
            </div>
        </div>
    </Teleport>

    <nav>
        <LogoIcon />

        <div class="user-auth-container row">
            <div class="auth-links" v-if="!isAuthenticated">
                <router-link :to="{ name: 'login' }"><button class="primary-btn">Login</button></router-link>
                <router-link :to="{ name: 'register' }" class="auth-link">Create an account</router-link>
            </div>
            <div class="user-nav-container row" v-else>
                <i class="fa fa-exclamation-triangle error" aria-hidden="true" v-if="!isApproved"></i>
                <div class="user-nav-info-container">
                    <p><span>{{ user['email'] }}</span></p>
                    <p class="warning user-nav-info">{{ userInfo }}</p>
                </div>

            </div>

            <div id="nav-logout-container" class="row" v-if="isAuthenticated" @click="showModal=true">
                <div class="icon-container" id="nav-logout-icon">
                    <svg class="medium-icon"  viewBox="0 0 24 24">
                        <path
                            d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"
                            fill="#323232" />
                        <path
                            d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"
                            fill="#323232" />
                    </svg>
                </div>
                <!-- <a class="logout-link">Logout</a> -->

            </div>

        </div>
    </nav>
</template>

<script>
import LogoIcon from '@/components/Logo.vue'
import {  mapState } from 'vuex';
export default {
    name: 'nav-bar',
    components: {
        LogoIcon,
    },
    data(){

        return {
            showModal: false
        }
    },

    computed: {
        ...mapState(['user']),
        isAuthenticated(){
            return this.user!=null;
        },
        isApproved(){
            if(this.isAuthenticated){
                return this.user['approved'];
            }
            return false;
        },
        // ...mapGetters(['isAuthenticated', 'isApproved']),
        userInfo() {
            if (!this.isApproved) {
                return "Not approved";
            }
            return null;
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout');
            this.$router.replace({name:'login'});
            
        }
    }

}
</script>